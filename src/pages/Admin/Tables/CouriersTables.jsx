import { Button, Form, Input, Modal, Popconfirm, Table, message } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "../../../utils/firebase/firebase-config";

const CouriersTables = () => {
  const [couriers, setCouriers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCouriers();
  }, []);

  const fetchCouriers = async () => {
    const couriersRef = collection(db, "couriers");
    const snapshot = await getDocs(couriersRef);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name || "Не указано",
      rating: doc.data().rating || "—",
      experience: doc.data().experience || "—",
    }));
    setCouriers(list);
  };

  const handleDelete = async (courierId) => {
    try {
      await deleteDoc(doc(db, "couriers", courierId));
      message.success("Курьер удалён!");
      setCouriers((prev) => prev.filter((c) => c.id !== courierId));
    } catch (error) {
      console.error(error);
      message.error("Ошибка при удалении курьера");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAddCourier = async () => {
    try {
      const values = await form.validateFields();
      await addDoc(collection(db, "couriers"), {
        name: values.name,
        experience: values.experience,
        rating: parseFloat(values.rating),
        isAvailable: false,
        reviewsCount: 0,
        vehicle: "",
        avatar: "",
      });
      message.success("Курьер добавлен!");
      form.resetFields();
      setIsModalOpen(false);
      fetchCouriers();
    } catch (error) {
      console.error(error);
      message.error("Ошибка при добавлении курьера");
    }
  };

  const columns = [
    { title: "Имя", dataIndex: "name", key: "name" },
    { title: "Рейтинг", dataIndex: "rating", key: "rating" },
    { title: "Стаж", dataIndex: "experience", key: "experience" },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Вы уверены, что хотите удалить?"
          onConfirm={() => handleDelete(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="primary" danger>
            Удалить
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Добавить курьера
      </Button>

      <Table
        columns={columns}
        dataSource={couriers}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        title={() => <h2 style={{ textAlign: "center" }}>Курьеры</h2>}
      />

      <Modal
        title="Добавить курьера"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddCourier}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="experience"
            label="Стаж"
            rules={[{ required: true, message: "Введите стаж" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Рейтинг"
            rules={[{ required: true, message: "Введите рейтинг" }]}
          >
            <Input type="number" step="0.1" min="0" max="5" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CouriersTables;
