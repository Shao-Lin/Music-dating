import { Link } from "react-router";
import limitImage from "../../../assets/serviceImages/lock.png";

export const LimitPage = () => {
  return (
    <div className="limit-page">
      <img src={limitImage} alt="Limit reached" className="limit-image" />
      <div className="limit-text">
        Вы истратили все пробные попытки.
        <br />
        <br />
        Чтобы получить доступ ко всем функциям приложения и новым свайпам вы
        можете{" "}
        <Link to="/signUp" className="register-link">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
