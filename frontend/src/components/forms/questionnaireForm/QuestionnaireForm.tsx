import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { DateInput } from "../../UI/inputs/dateInput/DateInput";
import { AutocompleteInput } from "../../UI/inputs/autocompleteInput/AutocompleteInput";
import { TextArea } from "../../UI/inputs/textArea/TextArea";
import { RadioButton } from "../../UI/buttons/radioButton/RadioButton";
import { ImageUploader } from "../../UI/buttons/imageUploaderButton/ImageUploaderButton";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";
import { CityOption } from "../../UI/inputs/autocompleteInput/AutocompleteInput";

export const QuestionnaireForm = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    birthDate: null,
    city: null as CityOption | null,
    gender: "",
    about: "",
    image: null as File | null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    birthDate: Yup.date()
      .nullable()
      .required("Обязательное поле")
      .max(new Date(), "Дата рождения не может быть в будущем")
      .typeError("Введите корректную дату"),
    city: Yup.object()
      .shape({
        label: Yup.string().required(),
      })
      .required("Обязательное поле"),
    gender: Yup.string().required("Обязательное поле"),
    about: Yup.string()
      .required("Обязательное поле")
      .min(50, "Минимум 50 символов"),
    image: Yup.mixed()
      .required("Фото обязательно")
      .test("fileSize", "Размер файла не должен превышать 10 МБ", (value) => {
        if (!value) return false; // если файл не загружен
        return (value as File).size <= 10 * 1024 * 1024; // 10MB в байтах
      })
      .test("fileType", "Неподдерживаемый формат изображения", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "image/gif"].includes(
          (value as File).type
        );
      }),
  });

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          console.log("Данные формы:", { ...values, image: imageData });
          //setIsLoading(false);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          touched,
          errors,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-label">Имя</div>
            <ClassicInput
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name ? errors.name : ""}
              placeholder="Введите имя"
            />
            <div className="form-label">Дата рождения</div>
            <DateInput
              value={values.birthDate}
              onChange={(val) => setFieldValue("birthDate", val)}
              onBlur={handleBlur}
              error={!!(touched.birthDate && errors.birthDate)}
              helperText={touched.birthDate ? errors.birthDate : ""}
            />

            <div className="form-label">Город</div>
            <AutocompleteInput
              name="city"
              value={values.city}
              onChange={(val) => setFieldValue("city", val)}
              onBlur={handleBlur}
              error={touched.city ? errors.city : ""}
            />
            <div className="form-label">О себе</div>

            <TextArea
              value={values.about}
              onChange={handleChange}
              name="about"
              error={touched.about ? errors.about : ""}
            />
            <div className="form-label">Пол</div>
            <RadioButton
              value={values.gender}
              handleChange={(e) => setFieldValue("gender", e.target.value)}
              error={touched.gender ? errors.gender : ""}
            />

            <ImageUploader
              onImageUpload={(file, preview) => {
                setImageData(preview);
                setFieldValue("image", file);
              }}
            />
            {touched.image && errors.image && (
              <div
                className="form-error"
                style={{ marginTop: "8px", color: "red" }}
              >
                {errors.image}
              </div>
            )}

            <div className="form-button">
              <ClassicButton
                type="submit"
                name="Отправить"
                isLoading={isLoading}
              />

              <div className="form-error">
                {"Ошибка сервера. Повторите попытку позже."}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
