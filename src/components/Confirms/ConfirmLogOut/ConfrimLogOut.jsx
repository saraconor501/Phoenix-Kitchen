import { useState } from 'react';
import { Modal,} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import useAuthStore from "../../../store/auth-slice/auth-slice";
import c from './ConfrimLogOut.module.css';

const ConfirmOut = () => {
    const { logoutUser } = useAuthStore();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await logoutUser();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="logout-container">
            <div onClick={showModal} className={c.nav}>
                Выйти из аккаунта 
               
            </div>

            <Modal
                title="Вы уверены, что хотите выйти?"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Выйти"
                okType="danger"
                cancelText="Отмена"
                icon={<ExclamationCircleFilled />}
            >
                <p>После выхода вам потребуется снова ввести учетные данные.</p>
            </Modal>
        </div>
    );
};

export default ConfirmOut;