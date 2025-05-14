import "../styles/main.scss";
import { LoginForm } from "../components/forms/loginForm/LoginForm";
import { Link } from "react-router";
export const LoginPage = () => {
  return (
    <>
      <header className="header-vibe-entry">Vibe</header>
      <main className="container">
        <LoginForm />
        <div className="entry-links">
          <Link to="/infoPage">Войти как гость</Link>
          <Link to="/signUp">Зарегистрироваться</Link>
        </div>
      </main>
    </>
  );
};
