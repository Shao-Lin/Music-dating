import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextArea } from "../../UI/inputs/textArea/TextArea";
import { AudioButton } from "../../UI/buttons/audioButton/AudioButton";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";

import { usePatchActiveTrackMutation } from "../../../api/settingsAndEditProfileApi";
import { useGetUserDataQuery } from "../../../api/userApi";
import type { Track } from "./editProfileTypes";
import { useEditProfileMutation } from "../../../api/settingsAndEditProfileApi";
import { useRegenerateTracksMutation } from "../../../api/settingsAndEditProfileApi";
import { WaitingPage } from "../../../pages/servicePages/waiting/WaitingPage";
import { useNavigate } from "react-router";
import arrowBack from "../../../assets/chat/ArrowBack.svg";
import { useTranslation } from "react-i18next";

type UserData = {
  about: string;
  tracks: Track[];
};

interface FormValues {
  about: string;
}

export const EditProfileForm = () => {
  const {
    data: user,
    refetch,
    isLoading: isUserLoading,
  } = useGetUserDataQuery(undefined);
  const [editProfile] = useEditProfileMutation();
  const [regenerateTrack, { isLoading }] = useRegenerateTracksMutation();
  const [patchActiveTrack] = usePatchActiveTrackMutation();
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [localTracks, setLocalTracks] = useState<Track[]>([]);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    about: Yup.string()
      .required(t("validation.required"))
      .min(10, t("validation.min")),
  });

  // Инициализация локального состояния треков
  useEffect(() => {
    if (user?.tracks) {
      setLocalTracks(user.tracks); // Сохраняем исходный порядок треков
      const activeIndex = user.tracks.findIndex((track: Track) => track.isMain);
      if (activeIndex === -1) {
        console.error("Main track not found");
        setSelectedTrack(0); // Устанавливаем первый трек по умолчанию
      } else {
        setSelectedTrack(activeIndex);
      }
    }
  }, [user]);

  // Обработка смены активного трека
  const handleTrackChange = async (index: number) => {
    setSelectedTrack(index);
    const selectedTrackData = localTracks[index];
    console.log("Изменён активный трек:", selectedTrackData);

    try {
      await patchActiveTrack(selectedTrackData.trackId).unwrap();
      // Обновляем только флаг isMain, сохраняя порядок треков
      refetch();
      const updatedTracks = localTracks.map((track, i) =>
        i === index ? { ...track, isMain: true } : { ...track, isMain: false }
      );
      setLocalTracks(updatedTracks);
    } catch (error) {
      console.error("Ошибка при смене активного трека:", error);
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (values: FormValues) => {
    try {
      await editProfile({
        ...user,
        about: values.about,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
    try {
      await regenerateTrack(undefined).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (isUserLoading) {
    return <div>{t("loadingUserData")}</div>;
  }

  if (isLoading) {
    return <WaitingPage />;
  }

  const { about } = user as UserData;

  return (
    <>
      <button
        className="edit-profile__back-button"
        onClick={() => navigate(-1)}
      >
        <img src={arrowBack} alt={t("back")} />
      </button>

      <div className="edit-profile__title">Vibe</div>
      <div className="edit-profile-container">
        <Formik
          initialValues={{ about }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <div className="about-title">{t("aboutLabel")}</div>

              <TextArea
                name="about"
                value={values.about}
                onChange={handleChange}
                error={touched.about ? errors.about : undefined}
                minRows={9}
              />

              <div className="audio-section">
                {localTracks.map((track, index) => (
                  <div className="audio-track" key={track.trackId || index}>
                    <AudioButton {...track} isEditProfile={true} />
                    <input
                      type="radio"
                      name="selectedTrack"
                      checked={selectedTrack === index}
                      onChange={() => handleTrackChange(index)}
                      className="radio-button"
                    />
                  </div>
                ))}
              </div>

              <div className="generate-button-wrapper">
                <ClassicButton name={t("generate")} type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
