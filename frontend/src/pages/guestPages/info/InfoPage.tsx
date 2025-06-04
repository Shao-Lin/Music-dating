import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const InfoPage = () => {
  const { t } = useTranslation();

  return (
    <div className="welcome-page">
      <div className="title">{t("infoPage.title")}</div>
      <div className="description">
        {t("infoPage.welcomeMessage1")}
        <br />
        {t("infoPage.welcomeMessage2")}
        <br />
        {t("infoPage.welcomeMessage3")}
      </div>
      <div className="spacer" />
      <div className="nav-buttons">
        <Link to="/login" className="nav-button back">
          {t("infoPage.back")}
        </Link>
        <Link to="/introductoryFeed" className="nav-button next">
          {t("infoPage.next")}
        </Link>
      </div>
    </div>
  );
};
