import { useNavigate } from "react-router";
import addPhoto from "../../../assets/actionMenu/addPhoto.png";
import editProfile from "../../../assets/actionMenu/profile.png";
import settings from "../../../assets/actionMenu/settings.png";

export const ActionMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="button-box">
      <button className="btn" onClick={() => navigate("/settings")}>
        <img src={settings} alt="кнопка 1" />
      </button>
      <button className="btn top" onClick={() => navigate("/editProfile")}>
        <img src={editProfile} alt="кнопка 2" />
      </button>
      <button className="btn">
        <img src={addPhoto} alt="кнопка 3" />
      </button>
    </div>
  );
};
