import { Link } from "react-router-dom";
import limitImage from "../assets/serviceImages/lock.png";
import { useTranslation } from "react-i18next";

export const UserLimitPage = () => {
  const { t } = useTranslation();

  return (
    <div className="swipe-limit-page">
      <img
        src={limitImage}
        alt={t("userLimitPage.alt")}
        className="limit-image"
      />
      <div className="text">{t("userLimitPage.limitReachedMessage")}</div>
      <div className="timer">23:59:59</div>
      <div className="bottom-text">
        {t("userLimitPage.orBuy")}
        <br />
        <Link to="/premiumSubscription" className="premium-link">
          {t("userLimitPage.vibePremium")}
        </Link>
      </div>
    </div>
  );
};
