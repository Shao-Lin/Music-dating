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

const validationSchema = Yup.object({
  about: Yup.string()
    .required("Это поле обязательно")
    .min(10, "Минимум 10 символов"),
});

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
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [patchActiveTrack] = usePatchActiveTrackMutation();

  // Устанавливаем активный трек при первом рендере
  useEffect(() => {
    const activeIndex = tracks.findIndex((track: Track) => track.isMain);
    if (activeIndex === -1) {
      throw new Error("Main track not found");
    }
    setSelectedTrack(activeIndex);
  }, [user]);

  const handleTrackChange = async (index: number) => {
    setSelectedTrack(index);
    const selectedTrack = tracks[index];
    console.log("Изменён активный трек:", selectedTrack);

    try {
      await patchActiveTrack(selectedTrack.trackId).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

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
    return <div>Загрузка данных пользователя...</div>;
  }

  if (isLoading) {
    return <WaitingPage />;
  }

  const { tracks, about } = user as UserData;

  return (
    <>
      <button
        className="edit-profile__back-button"
        onClick={() => navigate(-1)}
      >
        <img src={arrowBack} alt="Назад" />
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
              <div className="about-title">О себе</div>

              <TextArea
                name="about"
                value={values.about}
                onChange={handleChange}
                error={touched.about ? errors.about : undefined}
                minRows={9}
              />

              <div className="audio-section">
                {tracks.map((track, index) => (
                  <div className="audio-track" key={index}>
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
                <ClassicButton name="Сгенерировать" type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
