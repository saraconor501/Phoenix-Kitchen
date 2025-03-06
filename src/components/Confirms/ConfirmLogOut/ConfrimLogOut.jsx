import { ExclamationCircleFilled } from "@ant-design/icons";
import useAuthStore from "../../../store/auth-slice/auth-slice";
import c from './ConfrimLogOut.module.css'
import Modal from "antd/es/modal/Modal";

const { confirm } = Modal;

const ConfirmOut = () => {
    const { logoutUser } = useAuthStore();

    const handleLogOut = async () => {
        await logoutUser();
    };

    const showLogoutConfirm = () => {
        confirm({
            title: "Вы уверены, что хотите выйти?",
            icon: <ExclamationCircleFilled />,
            content: "После выхода вам потребуется снова ввести учетные данные.",
            okText: "Выйти",
            okType: "danger",
            cancelText: "Отмена",
            async onOk() {
                await handleLogOut();
            },
        });
    };

    return (
        <div className="logout-container">
            <div onClick={showLogoutConfirm} className={c.nav}>
                Выйти из аккаунта
                <img className={c.iconLogout} src="data:image/svg+xml,%3csvg%20width='22'%20height='22'%20viewBox='0%200%2022%2022'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.6667%2015.5833L19.25%2011M19.25%2011L14.6667%206.41667M19.25%2011H8.25M8.25%202.75H7.15C5.60986%202.75%204.83978%202.75%204.25153%203.04973C3.73408%203.31338%203.31338%203.73408%203.04973%204.25153C2.75%204.83978%202.75%205.60986%202.75%207.15V14.85C2.75%2016.3901%202.75%2017.1602%203.04973%2017.7485C3.31338%2018.2659%203.73408%2018.6866%204.25153%2018.9503C4.83978%2019.25%205.60986%2019.25%207.15%2019.25H8.25'%20stroke='%23807D7E'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" alt="Logout" />
            </div>
        </div>
    );
};

export default ConfirmOut;