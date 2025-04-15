import addPhoto from "../../../assets/actionMenu/addPhoto.png";
import editProfile from "../../../assets/actionMenu/EditProfile.png";
import settings from "../../../assets/actionMenu/settings.png";

export const ActionMenu = () => {
  return (
    <div className="button-box">
      <button className="btn">
        <img src={settings} alt="кнопка 1" />
      </button>
      <button className="btn top">
        <img src={editProfile} alt="кнопка 2" />
      </button>
      <button className="btn">
        <img src={addPhoto} alt="кнопка 3" />
      </button>
    </div>
  );
};
