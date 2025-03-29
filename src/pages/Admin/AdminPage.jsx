import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Table, Button, Popconfirm, message } from "antd";
import { app } from "../../utils/firebase/firebase-config";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    const usersList = snapshot.docs.map((doc) => ({
      key: doc.id, 
      id: doc.id,
      name: doc.data().name || "Не указано",
      email: doc.data().email || "Не указано",
      role: doc.data().role || "user",
    }));
    setUsers(usersList);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      message.success("Пользователь удалён!");
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      message.error("Ошибка при удалении пользователя");
    }
  };


  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Имя", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Роль", dataIndex: "role", key: "role" },
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
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Список пользователей</h1>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminPanel;
