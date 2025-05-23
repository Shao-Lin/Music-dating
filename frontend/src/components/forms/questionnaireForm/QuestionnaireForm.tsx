import { Formik } from "formik";

import { useState } from "react";
import { ClassicInput } from "../../UI/inputs/classicInput/ClassicInput";
import { DateInput } from "../../UI/inputs/dateInput/DateInput";
import { AutocompleteInput } from "../../UI/inputs/autocompleteInput/AutocompleteInput";
import { TextArea } from "../../UI/inputs/textArea/TextArea";
import { RadioButton } from "../../UI/buttons/radioButton/RadioButton";
import { ImageUploader } from "../../UI/buttons/imageUploaderButton/ImageUploaderButton";
import { ClassicButton } from "../../UI/buttons/classicButton/ClassicButton";

import {
  useLoginUserMutation,
  useSignupUserMutation,
} from "../../../api/authApi";
import { useNavigate } from "react-router";
import { deleteCredentials } from "../../../slices/authSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { validationSchema } from "./validation";
import { isFetchBaseQueryError } from "../../../utils/errorChecker";
import { isSerializedError } from "../../../utils/errorChecker";
import { useAppSelector } from "../../../hooks/reduxHook";
import type { FormValues } from "./types";

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

  //const login = "bagit2003@mail.ru";
  //const password = "1234567";
  const [singIn] = useLoginUserMutation();

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

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("about", values.about);
    formData.append("birthDate", values.birthDate.toISOString().split("T")[0]); // дату в строку
    formData.append("city", values.city.label);
    formData.append("gender", values.gender);
    formData.append("login", login);
    formData.append("password", password);
    formData.append("image", values.image);

    try {
      await singUp(formData).unwrap();
      //console.log(response);
      //const { accessToken } = response;

      //localStorage.setItem("token", accessToken);

      //console.log(`login ${localStorage.getItem("token")}`);

      //navigate("/profile");
      console.log("успех регистрации");
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

    try {
      const { accessToken, refreshToken } = await singIn({
        login,
        password,
      }).unwrap();
      console.log("успех входа");
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(`login ${localStorage.getItem("accessToken")}`);
      console.log(`refresh ${localStorage.getItem("refreshToken")}`);
      dispatch(deleteCredentials());

      navigate("/profile");
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Ошибка от сервера
        if (err.status === 401) {
          setAuthError("Неверный логин или пароль");
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
              minRows={5}
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
