import { Link } from "react-router-dom";

export const InfoPage = () => {
  return (
    <div className="welcome-page">
      <div className="title">Vibe</div>
      <div className="description">
        Добро пожаловать! <br />
        Вам будут доступны 5 профилей для ознакомления с приложением.
        <br />
        После вы сможете зарегистрироваться
      </div>
      <div className="spacer" />
      <div className="nav-buttons">
        <Link to="/login" className="nav-button back">
          Назад
        </Link>
        <Link to="/introductoryFeed" className="nav-button next">
          Далее
        </Link>
      </div>
    </div>
  );
};
