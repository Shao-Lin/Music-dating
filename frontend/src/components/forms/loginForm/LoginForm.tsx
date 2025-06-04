import { Formik } from "formik";
import * as Yup from "yup";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { PasswordInput } from "../../UI/inputs/passwordInput/PasswordInput";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";
import { useState } from "react";
import { useLoginUserMutation } from "../../../api/authApi";
import { useNavigate } from "react-router";
import {
  isFetchBaseQueryError,
  isSerializedError,
} from "../../../utils/errorChecker";
import { useTranslation } from "react-i18next";

type CredentialsType = {
  login: string;
  password: string;
};

export const LoginForm = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [login] = useLoginUserMutation();

  const validationSchema = Yup.object({
    login: Yup.string().required(t("required")).email(t("invalidEmail")),
    password: Yup.string().required(t("required")),
  });

  const handleLogin = async (credentials: CredentialsType) => {
    try {
      const { accessToken, refreshToken } = await login(credentials).unwrap();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/profile");
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (err.status === 401) {
          setAuthError(t("invalidCredentials"));
        } else if (err.status === 400) {
          setAuthError(t("badRequest"));
        } else {
          setAuthError(t("serverError", { status: err.status }));
        }
      } else if (isSerializedError(err)) {
        setAuthError(err.message || t("unknownError"));
      } else {
        setAuthError(t("unknownError"));
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
            <div className="form-title">{t("loginTitle")}</div>

            <div className="form-label">{t("emailLabel")}</div>
            <ClassicInput
              name="login"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.login ? errors.login : ""}
              placeholder={t("emailPlaceholder")}
            />

            <div className="form-label">{t("passwordLabel")}</div>
            <PasswordInput
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : ""}
            />

            <div className="form-button">
              <ClassicButton
                name={t("loginBtn")}
                type="submit"
                isLoading={isLoading}
              />
              {authError && <div className="form-error">{authError}</div>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
