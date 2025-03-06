import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../../store/auth-slice/auth-slice";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import style from "./Sign-up.module.css";
import auth from '../../../assets/images/auth.jpg';
import appleIcon from '../../../assets/images/apple-icon.svg';
import gogleIcon from '../../../assets/images/google-icon.svg';
import goToMain from '../../../assets/images/go-to-main.svg'


const SignUp = () => {
  const { registerUser, loginWithGoogle, isFetching, error } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", repeatPassword: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", repeatPassword: "" });

    let valid = true;
    const newErrors = {};

    if (password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
      valid = false;
    }

    if (password !== repeatPassword) {
      newErrors.repeatPassword = "Пароли не совпадают";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    await registerUser(email, password);
    navigate("/");
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.banner}>
          <img src={auth} alt="banner" />
        </div>

        <div className={style.formContainer}>
          <div className={style.form}>
            <div className={style.formAuth}>
              <h2 className={style.formTitle}>Регистрация</h2>

              {error && <p className={style.errorMessage}>{error}</p>}

              <div className={style.providers}>
                <button
                  className={style.loginProvider}
                  onClick={() => loginWithGoogle().then(() => navigate("/"))}
                  disabled={isFetching}
                >
                  <img style={{ borderRadius: "50%" }} src={gogleIcon} alt="Google" /> Google
                </button>
                <button className={style.loginProvider}>
                  <img style={{ borderRadius: "50%" }} src={appleIcon} alt="Apple" /> Apple
                </button>
              </div>

              <div className={style.toLogin}>
                <span style={{ color: "#9E9E9E", fontSize: "18px", fontWeight: "400" }}>У вас уже есть аккаунт?</span>
                <Link className={style.titleLogin} to="/auth/login">Войти в аккаунт</Link>
              </div>

              <form onSubmit={handleSubmit} className={style.formFill}>
                <div className={style.inputContainer}>
                  <Input
                    className={errors.email ? `${style.input} ${style.inputError}` : style.input}
                    type="email"
                    placeholder="Введите свой email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <p className={style.errorText}>{errors.email}</p>}
                </div>

                <div className={style.inputContainer}>
                  <Input.Password
                    className={errors.password ? `${style.input} ${style.inputError}` : style.input}
                    placeholder="Введите свой пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    iconRender={(visible) => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                  {errors.password && <p className={style.errorText}>{errors.password}</p>}
                </div>

                <div className={style.inputContainer}>
                  <Input.Password
                    className={errors.repeatPassword ? `${style.input} ${style.inputError}` : style.input}
                    placeholder="Введите повторно свой пароль"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    iconRender={(visible) => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
                  />
                  {errors.repeatPassword && <p className={style.errorText}>{errors.repeatPassword}</p>}
                </div>

                <button
                  type="primary"
                  disabled={isFetching}
                  className={style.submitButton}
                >
                  {isFetching ? "Регистрация..." : "Зарегистрироваться"}
                </button>
              </form>
            </div>

            <Link className={style.go_to_main} to="/">
              <img src={goToMain} alt="Go back" /> Вернуться на главную страницу.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;