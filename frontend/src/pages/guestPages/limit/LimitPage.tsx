import { Link } from "react-router";
import limitImage from "../../../assets/serviceImages/lock.png";
import { useTranslation } from "react-i18next";

export const LimitPage = () => {
  const { t } = useTranslation();

  return (
    <div className="limit-page">
      <img
        src={limitImage}
        alt={t("limitPage.limitReachedAlt")}
        className="limit-image"
      />
      <div className="limit-text">
        {t("limitPage.usedAllAttempts")}
        <br />
        <br />
        {t("limitPage.getAccess") + " "}
        <Link to="/signUp" className="register-link">
          {t("limitPage.register")}
        </Link>
      </div>
    </div>
  );
};
