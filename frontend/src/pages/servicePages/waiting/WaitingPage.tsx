import { useTranslation } from "react-i18next";
import waitingImage from "../../../assets/serviceImages/wait.png";

export const WaitingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="waiting-page">
      <img
        src={waitingImage}
        alt={t("waitingPage.alt")}
        className="waiting-image"
      />
      <div className="waiting-text">
        {t("waitingPage.text")}
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
