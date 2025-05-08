import arrowBack from "../assets/chat/ArrowBack.svg";
import { EditProfileForm } from "../components/forms/editProfileForm/EditProfileForm";

import cov3 from "../assets/testMusic/obloj3.webp";
import cov6 from "../assets/testMusic/cov6.jpg";
import sound from "../assets/testMusic/linkin-park-in-the-end-original_(bobamuz.online).mp3";
import type { Track } from "../components/forms/editProfileForm/editProfileTypes";
import type { aboutAndMusicProp } from "../components/forms/editProfileForm/editProfileTypes";
import { useNavigate } from "react-router";
export const EditProfile = () => {
  const navigate = useNavigate();
  const testTrack1: Track = {
    id: "12e21",
    isActive: false,
    music: sound,
    cover: cov3,
    name: "Messi",
  };

  const testTrack2: Track = {
    id: "2234",
    isActive: true,
    music: sound,
    cover: cov6,
    name: "Ronaldo",
  };

  const arrTrack = [testTrack1, testTrack2];

  const aboutAndMusic: aboutAndMusicProp = {
    about: "Пупупупупуп пууу",
    audioTracks: arrTrack,
  };

  return (
    <div className="edit-profile">
      <button
        className="edit-profile__back-button"
        onClick={() => navigate(-1)}
      >
        <img src={arrowBack} alt="Назад" />
      </button>

      <div className="edit-profile__title">Vibe</div>

      <EditProfileForm {...aboutAndMusic} />
    </div>
  );
};
