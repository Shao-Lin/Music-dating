import "../styles/main.scss";
import { LoginForm } from "../components/forms/loginForm/LoginForm";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <header className="header-vibe-entry">Vibe</header>
      <main className="container">
        <LoginForm />
        <div className="entry-links">
          <Link to="/infoPage">{t("loginPage.guestLogin")}</Link>
          <Link to="/signUp">{t("loginPage.signUpLink")}</Link>
        </div>
      </main>
    </>
  );
};
