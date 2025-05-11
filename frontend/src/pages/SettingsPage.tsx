import { useNavigate } from "react-router";
import arrowBack from "../assets/chat/ArrowBack.svg";
import { Settings } from "../components/settings/Settings";

export type userSettingsProps = {
  isAutoplay: boolean;
  language: string;
  city: string;
  rangeAge: [number, number];
};

export const SettingsPage = () => {
  const navigate = useNavigate();

  const userSettings: userSettingsProps = {
    isAutoplay: true,
    language: "Russian",
    city: "Москва",
    rangeAge: [18, 35],
  };

  return (
    <div className="settings">
      <button className="settings__back-button" onClick={() => navigate(-1)}>
        <img src={arrowBack} alt="Назад" />
      </button>

      <div className="settings__title">Vibe</div>
      <Settings {...userSettings} />
    </div>
  );
};
