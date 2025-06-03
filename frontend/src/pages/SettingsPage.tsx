import { useNavigate } from "react-router";
import arrowBack from "../assets/chat/ArrowBack.svg";
import { Settings } from "../components/settings/Settings";
import { useGetSettingsDataQuery } from "../api/settingsAndEditProfileApi";
export type userSettingsProps = {
  lang: string;
  ageFrom: number;
  ageTo: number;
  subActive: boolean;
  activeFrom: string;
  activeTo: string;
  autoplay: boolean;
};

export const SettingsPage = () => {
  const {
    data: userSettings,
    isLoading,
    isError,
  } = useGetSettingsDataQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Загрузка настроек...</div>;
  }

  if (isError || !userSettings) {
    return <div>Ошибка загрузки настроек</div>;
  }

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
