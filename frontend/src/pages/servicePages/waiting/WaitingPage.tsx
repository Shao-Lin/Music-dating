import waitingImage from "../../../assets/serviceImages/wait.png";

export const WaitingPage = () => {
  return (
    <div className="waiting-page">
      <img src={waitingImage} alt="Ожидание" className="waiting-image" />
      <div className="waiting-text">
        Пожалуйста подождите, <br />
        идет генерация музыки
        <span className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
      <div className="spinner" />
    </div>
  );
};
