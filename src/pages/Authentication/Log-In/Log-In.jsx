import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../../store/auth-slice/auth-slice";
import style from "./Log-In.module.css"

const Login = () => {
    const { loginUser, loginWithGoogle, isFetching, error, user } = useAuthStore()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({ email: "", password: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ email: "", password: "" });

        let valid = true;
        const newErrors = {};

        if (!email.includes("@")) {
            newErrors.email = "Введите корректный email";
            valid = false;
        }

        if (password.length < 6) {
            newErrors.password = "Пароль должен содержать минимум 6 символов";
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        const response = await loginUser(email, password);
        console.log("Login Response:", response)

        if (response?.success) {
            navigate('/');
        }
    };

    return (
        <div className={style.container}>
            <div className={style.banner}>
                <img src="/images/auth.svg" alt="banner" />
            </div>

            <div className={style.formContainer}>
                <div className={style.form}>
                    <div className={style.formAuth}>
                        <h2 className={style.formTitle}>
                            Login to get
                        </h2>

                        {error && <p className={style.errorMessage}>{error}</p>}

                        <div className={style.providers}>
                            <button className={style.loginProvider} onClick={() => loginWithGoogle().then(() => navigate("/"))} disabled={isFetching}>
                                <img src="/images/google-icon.svg" alt="Google" /> Google
                            </button>
                            <button className={style.loginProvider}>
                                <img src="/images/apple-icon.svg" alt="Apple" /> Apple
                            </button>
                        </div>

                        <div className={style.toSignup}>
                            <span style={{ color: "#9E9E9E", fontSize: "18px", fontWeight: "400" }}>
                                Нет аккаунта?
                            </span>
                            <Link className={style.titleLogin} to="/auth/sign-up">Зарегистрируйтесь</Link>
                        </div>

                        <form onSubmit={handleSubmit} className={style.formFill}>
                            <div className={style.inputContainer}>
                                <input className={`${style.input} ${errors.email ? style.inputError : ""}`}
                                    type="email"
                                    placeholder="Введите email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                {errors.email && <p className={style.errorText}>{errors.email}</p>}
                            </div>

                            <div className={style.inputContainer}>
                                <input className={`${style.input} ${errors.password ? style.inputError : ""}`}
                                    type="password"
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                {errors.password && <p className={style.errorText}>{errors.password}</p>}
                            </div>

                            <button type="submit" disabled={isFetching} className={style.submitButton}>
                                {isFetching ? "Вход..." : "Login"}
                            </button>
                        </form>
                    </div>

                    <Link className={style.go_to_main} to="/">
                        <img src="/images/go-to-main.svg" alt="Go back" /> Go Back To Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;