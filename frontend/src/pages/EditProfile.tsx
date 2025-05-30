import arrowBack from "../assets/chat/ArrowBack.svg";
import { EditProfileForm } from "../components/forms/editProfileForm/EditProfileForm";
import { useNavigate } from "react-router";
import { useGetUserDataQuery } from "../api/userApi";
export const EditProfile = () => {
  const { data: user } = useGetUserDataQuery(undefined);
  const navigate = useNavigate();

  return (
    <div className="edit-profile">
      <button
        className="edit-profile__back-button"
        onClick={() => navigate(-1)}
      >
        <img src={arrowBack} alt="Назад" />
      </button>

      <div className="edit-profile__title">Vibe</div>

      <EditProfileForm {...user} />
    </div>
  );
};
