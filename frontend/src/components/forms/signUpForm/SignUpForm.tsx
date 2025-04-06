import { Formik } from "formik";
import * as Yup from "yup";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { PasswordInput } from "../../UI/inputs/passwordInput/PasswordInput";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";
import { useState } from "react";

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

export const SignUpForm = () => {
  const [authError, setAuthError] = useState("");
  function fakeLoginRequest(login: string, password: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{ login: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setAuthError(""); // сброс ошибки при новой попытке
          try {
            // Имитация запроса
            const response = await fakeLoginRequest(
              values.login,
              values.password
            );

            if (!response.ok) {
              if (response.status === 401) {
                setAuthError("Неверный логин или пароль");
              } else {
                setAuthError("Ошибка сервера. Повторите попытку позже.");
              }
            } else {
              console.log("Успешный вход");
              // переход или действия после входа
            }
          } catch (error) {
            setAuthError("Произошла ошибка. Попробуйте позже.");
          } finally {
            setSubmitting(false);
          }
        }}
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
              error={touched.login && errors.login}
            />

            <div className="form-label">Пароль</div>
            <PasswordInput
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <div className="form-label">Подтверждение пароля</div>
            <PasswordInput
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
            />

            <div className="form-button">
              <ClassicButton name="Войти" type="submit" />
              {authError && <div className="form-error">{authError}</div>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
