import { Formik } from "formik";

import { useState } from "react";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { DateInput } from "../../UI/inputs/dateInput/DateInput";
import { AutocompleteInput } from "../../UI/inputs/autocompleteInput/AutocompleteInput";
import { TextArea } from "../../UI/inputs/textArea/TextArea";
import { RadioButton } from "../../UI/buttons/radioButton/RadioButton";
import { ImageUploader } from "../../UI/buttons/imageUploaderButton/ImageUploaderButton";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";

import { useSignupUserMutation } from "../../../api/authApi";
import { useNavigate } from "react-router";
import { deleteCredentials } from "../../../slices/authSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { validationSchema } from "./validation";
import { isFetchBaseQueryError } from "../../../utils/errorChecker";
import { isSerializedError } from "../../../utils/errorChecker";
import { useAppSelector } from "../../../hooks/reduxHook";
import type { FormValues } from "./types";
import type { SubmitData } from "./types";

export const QuestionnaireForm = () => {
  const [, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [singUp] = useSignupUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    name: "",
    about: "",
    birthDate: null,
    city: null,
    gender: "",
    image: null,
  };
  const login = useAppSelector((state) => state.authUsers.login);
  const password = useAppSelector((state) => state.authUsers.password);

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    if (
      !values.city ||
      !values.city.label ||
      !values.birthDate ||
      !values.image ||
      !login ||
      !password
    ) {
      console.error("Некорректные данные формы");
      return;
    }

    const submitData: SubmitData = {
      name: values.name,
      about: values.about,
      birthDate: values.birthDate,
      city: values.city.label,
      gender: values.gender,
      image: values.image,
      login,
      password,
    };
    try {
      console.log("Данные формы:", submitData);
      const response = await singUp(submitData).unwrap();
      const { token } = response;

      localStorage.setItem("token", token);
      dispatch(deleteCredentials());

      console.log(`login ${localStorage.getItem("token")}`);

      navigate("/profile");
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Ошибка от сервера
        if (err.status === 409) {
          setAuthError("Пользователь уже существует");
        } else if (err.status === 400) {
          setAuthError("Некорректный запрос");
        } else {
          setAuthError(`Ошибка сервера: ${err.status}`);
        }
      } else if (isSerializedError(err)) {
        // Ошибка сериализации
        setAuthError(err.message || "Неизвестная ошибка");
      } else {
        // Другие ошибки
        setAuthError("Что-то пошло не так");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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

            <div className="form-label">Фото</div>
            <ImageUploader
              onImageUpload={(file, preview) => {
                setImagePreview(preview);
                setFieldValue("image", file);
              }}
            />
            {touched.image && errors.image && (
              <div className="form-error">{errors.image}</div>
            )}

            <div className="form-button">
              <ClassicButton
                type="submit"
                name="Отправить"
                isLoading={isLoading}
              />
              {authError && <div className="form-error">{authError}</div>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
