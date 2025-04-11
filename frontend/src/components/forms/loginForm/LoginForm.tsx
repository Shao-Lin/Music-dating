import { Formik } from "formik";
import * as Yup from "yup";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { PasswordInput } from "../../UI/inputs/passwordInput/PasswordInput";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";
import { useState } from "react";
import { useLoginUserMutation } from "../../../api/authApi";
import { useNavigate } from "react-router";
import type { SerializedError } from "@reduxjs/toolkit";

function isFetchBaseQueryError(
  error: unknown
): error is { status: number; data: unknown } {
  return typeof error === "object" && error !== null && "status" in error;
}
function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error !== null && "message" in error;
}

const validationSchema = Yup.object({
  login: Yup.string()
    .required("Обязательное поле")
    .email("Введите корректный email."),
  password: Yup.string().required("Обязательное поле"),
});

type CredentialsType = {
  login: string;
  password: string;
};

export const LoginForm = () => {
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [login] = useLoginUserMutation();

  const handleLogin = async (credentials: CredentialsType) => {
    try {
      const { token } = await login(credentials).unwrap();
      localStorage.setItem("token", token);
      console.log(`login ${localStorage.getItem("token")}`);

      navigate("/profile");
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Ошибка от сервера
        if (err.status === 401) {
          setAuthError("Неверный логин или пароль");
        } else if (err.status === 400) {
          setAuthError("Некорректный запрос");
        } else {
          setAuthError(`Ошибка сервера: ${err.status}`);
        }
      } else if (isSerializedError(err)) {
        // Ошибка сериализации
        setAuthError(err.message || "Неизвестная ошибка");
      } else {
        // Другие ошибки
        setAuthError("Что-то пошло не так");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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
