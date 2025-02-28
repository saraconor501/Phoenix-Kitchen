
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../../store/auth-slice/auth-slice";
import style from "./Sign-up.module.css"

const SignUp = () => {
  const { registerUser, loginWithGoogle, isFetching, error, } = useAuthStore()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", repeatPassword: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", repeatPassword: "" })

    let valid = true
    const newErrors = {}

    if (password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов"
      valid = false
    }

    if (password !== repeatPassword) {
      newErrors.repeatPassword = "Пароли не совпадают"
      valid = false
    }

    if (!valid) {
      setErrors(newErrors)
      return
    }

    await registerUser(email, password)
    navigate("/")
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.banner}>
          <img src="/images/auth.svg" alt="banner" />
        </div>

        <div className={style.formContainer}>
          <div className={style.form}>
            <div className={style.formAuth}>
              <h2 className={style.formTitle}>
                Регистрация
              </h2>

              {error && <p className={style.errorMessage}>{error}</p>}

              <div className={style.providers}>
                <button className={style.loginProvider} onClick={() => loginWithGoogle().then(() => navigate("/"))} disabled={isFetching}>
                  <img style={{ borderRadius: "50%" }} src="/images/google-icon.svg" alt="Google" /> Google
                </button>
                <button className={style.loginProvider}>
                  <img style={{ borderRadius: "50%" }} src="/images/apple-icon.svg" alt="Apple" /> Apple
                </button>
              </div>

              <div className={style.toLogin}>
                <span style={{ color: "#9E9E9E", fontSize: "18px", fontWeight: "400" }}>У вас уже есть аккаунт?</span>
                <Link className={style.titleLogin} to="/auth/login">Войти в аккаунт</Link>
              </div>

              <form onSubmit={handleSubmit} className={style.formFill}>
                <div className={style.inputContainer}>
                  <input className={`${style.input} ${errors.email ? style.inputError : ""}`} type="email" placeholder="Введите свой email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  {errors.email && <p className={style.errorText}>{errors.email}</p>}
                </div>

                <div className={style.inputContainer}>
                  <input className={`${style.input} ${errors.password ? style.inputError : ""} `} type="password" placeholder="Введите свой пороль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  {errors.password && <p className={style.errorText}>{errors.password}</p>}
                </div>

                <div className={style.inputContainer}>
                  <input className={`${style.input} ${errors.repeatPassword ? style.inputError : ""}`} type="password" placeholder="Введите повторно свой пароль" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                  {errors.repeatPassword && <p className={style.errorText}>{errors.repeatPassword}</p>}
                </div>

                <button type="submit" disabled={isFetching} className={style.submitButton}>
                  {isFetching ? "Регистрация..." : "Зарегистрироваться"}
                </button>
              </form>
            </div>


            <Link className={style.go_to_main} to="/">
              <img src="/images/go-to-main.svg" alt="Go back" /> Вернуться на главную страницу.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;