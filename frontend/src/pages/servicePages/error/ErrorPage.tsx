import errorImage from "../../../assets/serviceImages/broken heart.png";
import { ClassicButton } from "../../../components/UI/buttons/classicButton/ClassicButton";

export const ErrorPage = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      <img src={errorImage} alt="Ошибка" className="error-image" />
      <div className="error-text">
        Что-то пошло не так 😓 <br /> Попробуем еще раз?
      </div>
      <div className="button-wrapper">
        <ClassicButton name="Обновить страницу" onClick={handleReload} />
      </div>
    </div>
  );
};
