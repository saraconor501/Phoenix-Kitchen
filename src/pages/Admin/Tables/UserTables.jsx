import { Button, message, Popconfirm, Table } from "antd"
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../../../utils/firebase/firebase-config";


const UserTables = () => {
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
    } catch {
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

  return <Table
  title={() => <h2 style={{ textAlign: "center" }}>Пользователи</h2>}
    dataSource={users}
    columns={columns}
    pagination={{ pageSize: 5 }}
    />
}

export default UserTables