
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import UserTables from "./Tables/UserTables";
import RestTables from "./Tables/RestTables";
import CouriersTables from "./Tables/CouriersTables";


const AdminPanel = () => {
  
  
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Панель админа</h1>
      
         <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Пользователи" key="1">
        <UserTables />
      </TabPane>
      <TabPane tab="Рестораны" key="2">
      <RestTables />
      </TabPane>
      <TabPane tab="Курьеры" key="3">
        <CouriersTables />
      </TabPane>
    </Tabs>

    </div>
  );
};

export default AdminPanel;
