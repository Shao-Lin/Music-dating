import { useNavigate } from "react-router";
import { useRef } from "react";
import addPhoto from "../../../assets/actionMenu/addPhoto.png";
import editProfile from "../../../assets/actionMenu/profile.png";
import settings from "../../../assets/actionMenu/settings.png";
import { useAddPhotoMutation } from "../../../api/userApi"; // путь к API может отличаться

export const ActionMenu = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [addPhotoMutation] = useAddPhotoMutation();

  const handlePhotoClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await addPhotoMutation(formData).unwrap();
      // Сбрасываем значение input после успешной загрузки
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Ошибка при загрузке фото:", error);
      // Также сбрасываем в случае ошибки
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="button-box">
      <button className="btn" onClick={() => navigate("/settings")}>
        <img src={settings} alt="кнопка 1" />
      </button>
      <button className="btn top" onClick={() => navigate("/editProfile")}>
        <img src={editProfile} alt="кнопка 2" />
      </button>
      <button className="btn" onClick={handlePhotoClick}>
        <img src={addPhoto} alt="кнопка 3" />
      </button>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};
