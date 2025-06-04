import { Formik } from "formik";
import * as Yup from "yup";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { PasswordInput } from "../../UI/inputs/passwordInput/PasswordInput";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { useState } from "react";
import { setCredentials } from "../../../slices/authSlice";
import { useNavigate } from "react-router";
import { useSendingEmailMutation } from "../../../api/authApi";
import { isFetchBaseQueryError } from "../../../utils/errorChecker";
import { useTranslation } from "react-i18next";

type CredentialsType = {
  login: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm = () => {
  const { t } = useTranslation(); // используем общий t
  const [sendEmailError, setSendEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sendingEmail] = useSendingEmailMutation();

  const validationSchema = Yup.object({
    login: Yup.string()
      .email(t("signUpPage.invalidEmail"))
      .required(t("signUpPage.required")),
    password: Yup.string()
      .min(6, t("signUpPage.minPassword"))
      .required(t("signUpPage.required")),
    confirmPassword: Yup.string()
      .min(6, t("signUpPage.minPassword"))
      .required(t("signUpPage.required")),
  });

  const handleSubmit = async (credentials: CredentialsType) => {
    const { login, password, confirmPassword } = credentials;
    if (password !== confirmPassword) {
      setSendEmailError(t("signUpPage.passwordMismatch"));
      return;
    }

    try {
      setIsLoading(true);
      await sendingEmail(login).unwrap();
      dispatch(setCredentials({ login, password }));
      navigate("/inputCode");
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if ("status" in error) {
          const errData = error.data as { message?: string };
          setSendEmailError(errData?.message || t("signUpPage.emailSendError"));
        } else {
          setSendEmailError(t("signUpPage.serverConnectionError"));
        }
      } else if (error instanceof Error) {
        setSendEmailError(error.message);
      } else {
        setSendEmailError(t("signUpPage.unknownError"));
      }
    } finally {
      setIsLoading(false);
    }
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
            <div className="form-title">{t("signUpPage.title")}</div>

            <div className="form-label">{t("signUpPage.emailLabel")}</div>
            <ClassicInput
              name="login"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.login ? errors.login : ""}
              placeholder={t("signUpPage.emailPlaceholder")}
            />

            <div className="form-label">{t("signUpPage.passwordLabel")}</div>
            <PasswordInput
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : ""}
            />

            <div className="form-label">
              {t("signUpPage.confirmPasswordLabel")}
            </div>
            <PasswordInput
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword ? errors.confirmPassword : ""}
            />

            <div className="form-button">
              <ClassicButton
                name={t("signUpPage.sendCodeBtn")}
                type="submit"
                isLoading={isLoading}
              />
              {sendEmailError && (
                <div className="form-error">{sendEmailError}</div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
