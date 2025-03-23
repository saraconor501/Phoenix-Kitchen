import { useState } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../../../store/auth-slice/auth-slice";
import c from './ConfrimLogOut.module.css';

const ConfirmOut = () => {
    const { logoutUser } = useAuthStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await logoutUser();
        setIsModalVisible(false);
        navigate("/"); // Перенос на главную
        window.location.reload(); // Обновление страницы
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="logout-container">
            <div onClick={showModal} className={c.nav}>
                Выйти из аккаунта <img src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="out" />
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