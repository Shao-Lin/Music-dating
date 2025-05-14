import { Link } from "react-router-dom";
import limitImage from "../assets/serviceImages/lock.png";

export const UserLimitPage = () => {
  return (
    <div className="swipe-limit-page">
      <img src={limitImage} alt="Swipe limit" className="limit-image" />
      <div className="text">
        Вы достигли дневного лимита свайпов. Чтобы продолжить подождите
      </div>
      <div className="timer">23:59:59</div>
      <div className="bottom-text">
        Или купите
        <br />
        <Link to="/premiumSubscription" className="premium-link">
          Vibe Premium
        </Link>
      </div>
    </div>
  );
};
