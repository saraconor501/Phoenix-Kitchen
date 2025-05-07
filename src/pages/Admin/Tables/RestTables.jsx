import { Table, Button, Modal, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useRestaurants } from '../../../store/restaurants-slice/restaurants-slice';
import { addMenuItem, deleteMenuItem } from '../../../store/restaurants-slice/restaurants-slice';

const RestTables = () => {
  const { data: restaurants = [], isLoading, refetch } = useRestaurants();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRestId, setCurrentRestId] = useState(null);
  const [form] = Form.useForm();

  const showModal = (restaurantId) => {
    setCurrentRestId(restaurantId);
    setIsModalOpen(true);
  };

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      await addMenuItem(currentRestId, values);
      message.success('Блюдо добавлено!');
      setIsModalOpen(false);
      form.resetFields();
      refetch(); // обновляем таблицу
    } catch (err) {
      console.error(err);
      message.error('Ошибка при добавлении');
    }
  };

  const handleDelete = async (restaurantId, itemId) => {
    try {
      await deleteMenuItem(restaurantId, itemId);
      message.success('Блюдо удалено!');
      refetch();
    } catch (err) {
      console.error(err);
      message.error('Ошибка при удалении');
    }
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
    },
    {
      title: 'Меню',
      dataIndex: 'menu',
      render: (menu, record) => (
        <div>
          <ul style={{ paddingLeft: 20 }}>
            {menu.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price}₽{' '}
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(record.id, item.id)}
                >
                  Удалить
                </Button>
              </li>
            ))}
          </ul>
          <Button type="primary" onClick={() => showModal(record.id)}>
            Добавить блюдо
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = restaurants.map((rest) => ({
    key: rest.id,
    id: rest.id,
    name: rest.name || '—',
    address: rest.address || '—',
    phone: rest.phone || '—',
    menu: rest.menu || [],
  }));

  return (
    <>
      <Table
        loading={isLoading}
        title={() => <h2 style={{ textAlign: 'center' }}>Рестораны</h2>}
        dataSource={dataSource}
        columns={columns}
        rowClassName="editable-row"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Добавить блюдо"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAdd}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Название блюда" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RestTables;
