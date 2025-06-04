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
import { getValidationSchema } from "./validation";
import { isFetchBaseQueryError } from "../../../utils/errorChecker";
import { isSerializedError } from "../../../utils/errorChecker";
import { useAppSelector } from "../../../hooks/reduxHook";
import type { FormValues } from "./types";
import { WaitingPage } from "../../../pages/servicePages/waiting/WaitingPage";
import { useTranslation } from "react-i18next";

export const QuestionnaireForm = () => {
  const [, setImagePreview] = useState<string | null>(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [singUp, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [singIn] = useLoginUserMutation();

  const login = useAppSelector((state) => state.authUsers.login);
  const password = useAppSelector((state) => state.authUsers.password);
  const { t } = useTranslation();

  const initialValues: FormValues = {
    name: "",
    about: "",
    birthDate: null,
    city: null,
    gender: "",
    image: null,
  };

  if (isLoading) {
    return <WaitingPage />;
  }

  const handleSubmit = async (values: FormValues) => {
    setIsLoadingBtn(true);
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
      setIsLoadingBtn(false);
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
    <>
      <header className="header-questionnaire">
        {t("questionnairePage.title")}
      </header>
      <main className="container">
        <div className="form-wrapper">
          <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={getValidationSchema(t)}
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
                <div className="form-label">
                  {t("questionnairePage.name.label")}
                </div>
                <ClassicInput
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name ? errors.name : ""}
                  placeholder={t("questionnairePage.name.placeholder")}
                />

                <div className="form-label">
                  {t("questionnairePage.birthDate.label")}
                </div>
                <DateInput
                  value={values.birthDate}
                  onChange={(val) => setFieldValue("birthDate", val)}
                  onBlur={handleBlur}
                  error={!!(touched.birthDate && errors.birthDate)}
                  helperText={touched.birthDate ? errors.birthDate : ""}
                />

                <div className="form-label">
                  {t("questionnairePage.city.label")}
                </div>
                <AutocompleteInput
                  name="city"
                  value={values.city}
                  onChange={(val) => setFieldValue("city", val)}
                  onBlur={handleBlur}
                  error={touched.city ? errors.city : ""}
                />

                <div className="form-label">
                  {t("questionnairePage.about.label")}
                </div>
                <TextArea
                  value={values.about}
                  onChange={handleChange}
                  name="about"
                  error={touched.about ? errors.about : ""}
                  minRows={5}
                />

                <div className="form-label">
                  {t("questionnairePage.gender.label")}
                </div>
                <RadioButton
                  value={values.gender}
                  handleChange={(e) => setFieldValue("gender", e.target.value)}
                  error={touched.gender ? errors.gender : ""}
                />

                <div className="form-label">
                  {t("questionnairePage.image.label")}
                </div>
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
                    name={t("questionnairePage.submit")}
                    isLoading={isLoadingBtn}
                  />
                  {authError && <div className="form-error">{authError}</div>}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
};
