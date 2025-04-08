import { Formik } from "formik";
import * as Yup from "yup";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { PasswordInput } from "../../UI/inputs/passwordInput/PasswordInput";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";
import { useState } from "react";

const validationSchema = Yup.object({
  login: Yup.string()
    .required("Обязательное поле")
    .email("Введите корректный email."),
  password: Yup.string().required("Обязательное поле"),
});

export const LoginForm = () => {
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function fakeLoginRequest(login: string, password: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setAuthError(""); // сброс ошибки при новой попытке

          setIsLoading(true);

          //setIsLoading(false)
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
            <div className="form-title">Вход</div>

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
