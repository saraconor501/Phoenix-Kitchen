import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { db } from '../../utils/firebase/firebase-config'; // Импортируйте Firebase конфигурацию
import { collection, getDocs } from 'firebase/firestore';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Uid', dataIndex: 'uid', key: 'uid' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
        const userCollection = collection(db, "users")
        const querySnapshot = await getDocs(userCollection)
        const userData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                email: doc.id || "Нет email",
                orders: Array.isArray(data.orders) ? data.orders : [],
                isAdmin: data.isAdmin || false,
                cart: data.cart || [],
            };
        })
        setUsers(userData);
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
    } 
};

useEffect(() => {
    fetchUsers()
}, [])


  return (
    <Table 
    columns={columns}
    dataSource={users.map((user) => 
      ({key: user.id, name: user.name, email: user.email}))}
     />
  );
};

export default AdminPage;
