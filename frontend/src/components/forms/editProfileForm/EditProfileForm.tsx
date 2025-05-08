import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextArea } from "../../UI/inputs/textArea/TextArea";
import { AudioButton } from "../../UI/buttons/audioButton/AudioButton";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";

import { aboutAndMusicProp } from "./editProfileTypes";

const validationSchema = Yup.object({
  about: Yup.string()
    .required("Это поле обязательно")
    .min(10, "Минимум 10 символов"),
});

export const EditProfileForm = ({ about, audioTracks }: aboutAndMusicProp) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(
    null
  );

  // Устанавливаем активный трек при первом рендере
  useEffect(() => {
    const activeIndex = audioTracks.findIndex((track) => track.isActive);
    if (activeIndex !== -1) {
      setSelectedTrackIndex(activeIndex);
    }
  }, [audioTracks]);

  const handleTrackChange = (index: number) => {
    setSelectedTrackIndex(index);
    const selectedTrack = audioTracks[index];
    console.log("Изменён активный трек:", selectedTrack);
    // Здесь можно вызвать API: await updateActiveTrack(selectedTrack);
  };

  return (
    <div className="edit-profile-container">
      <Formik
        initialValues={{ about }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("О себе обновлено:", values.about);
          // Пример: await updateAbout(values.about);
        }}
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
              {audioTracks.map((track, index) => (
                <div className="audio-track" key={track.id}>
                  <AudioButton {...track} isEditProfile={true} />
                  <input
                    type="radio"
                    name="selectedTrack"
                    checked={selectedTrackIndex === index}
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
  );
};
