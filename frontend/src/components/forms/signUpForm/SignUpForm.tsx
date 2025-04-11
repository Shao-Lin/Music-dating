import { Formik } from "formik";
import * as Yup from "yup";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { PasswordInput } from "../../UI/inputs/passwordInput/PasswordInput";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { useState } from "react";
import { setCredentials } from "../../../slices/authSlice";
import { useNavigate } from "react-router";

const validationSchema = Yup.object({
  login: Yup.string()
    .min(3, "Длина от 3 до 20 символов")
    .max(20, "Длина от 3 до 20 символов")
    .email("Введите корректный email")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Не менее 6 символов")
    .required("Обязательное поле"),
  confirmPassword: Yup.string()
    .min(6, "Не менее 6 символов")
    .required("Обязательное поле"),
});

type CredentialsType = {
  login: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm = () => {
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (credentials: CredentialsType) => {
    const { login, password, confirmPassword } = credentials;
    if (password !== confirmPassword) {
      setAuthError("Пароли не совпадают");
      return;
    }
    dispatch(setCredentials({ login, password }));
    setIsLoading(false);
    navigate("/questionnaire");
  };

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{ login: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-title">Регистрация</div>

            <div className="form-label">Логин</div>
            <ClassicInput
              name="login"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.login ? errors.login : ""}
              placeholder="Введите логин"
            />

            <div className="form-label">Пароль</div>
            <PasswordInput
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : ""}
            />
            <div className="form-label">Подтверждение пароля</div>
            <PasswordInput
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword ? errors.confirmPassword : ""}
            />

            <div className="form-button">
              <ClassicButton name="Войти" type="submit" isLoading={isLoading} />
              {authError && <div className="form-error">{authError}</div>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
