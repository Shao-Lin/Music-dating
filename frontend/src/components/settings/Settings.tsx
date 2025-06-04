import { SwitchButton } from "../UI/buttons/switchButton/SwitchButton";
import { RadioLanguageSelectorBtn } from "../UI/buttons/radioLanguageSelectorBtn/RadioLanguageSelectorBtn";
import autoPlay from "../../assets/settingsIcon/autoPlay.png";
import switchLanguage from "../../assets/settingsIcon/switchLanguage.png";
import ageIcon from "../../assets/settingsIcon/userAge.png";
import locationIcon from "../../assets/settingsIcon/mapPoint.png";
import { AgeRangeSliderInput } from "../UI/inputs/rangeSliderInput/AgeRangeSliderInput";
import {
  AutocompleteInput,
  CityOption,
} from "../UI/inputs/autocompleteInput/AutocompleteInput";
import { useState } from "react";
import premiumIcon from "../../assets/settingsIcon/Premium.png";
import { ClassicButton } from "../UI/buttons/classicButton/ClassicButton";
import * as Yup from "yup";
import { Formik } from "formik";
import { CustomModal } from "../modals/questionModal/CustomModal";
import { useLogoutMutation } from "../../api/authApi";
import { useNavigate } from "react-router";
import type { userSettingsProps } from "../../pages/SettingsPage";
import { useGetUserDataQuery } from "../../api/userApi";
import { useEditProfileMutation } from "../../api/settingsAndEditProfileApi";
import { useTranslation } from "react-i18next";

export const Settings = ({
  lang,
  ageFrom,
  ageTo,
  subActive,
  activeFrom,
  activeTo,
  autoplay,
}: userSettingsProps) => {
  const { t } = useTranslation();
  const userSettings = {
    lang,
    ageFrom,
    ageTo,
    subActive,
    activeFrom,
    activeTo,
    autoplay,
  };
  const {
    data: userData,
    refetch: refetchUser,
    isLoading,
  } = useGetUserDataQuery(undefined);
  const [logout] = useLogoutMutation();
  const [editCity] = useEditProfileMutation();

  const [ageRange, setAgeRange] = useState<[number, number]>([ageFrom, ageTo]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <div>{t("loading")}</div>;
  if (!userData) return <div>{t("errorLoading")}</div>;

  const defaultCity: CityOption = { label: userData.city };

  const validationSchema = Yup.object().shape({
    city: Yup.object()
      .nullable()
      .shape({
        label: Yup.string().required(t("cityRequired")),
      })
      .required(t("cityRequired")),
  });

  const handleExit = async () => {
    try {
      await logout(localStorage.getItem("accessToken")).unwrap();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    }
  };

  return (
    <>
      {/* Автопроигрывание */}
      <div className="settings__option">
        <img src={autoPlay} alt={t("autoplay")} className="option__icon" />
        <span className="option__label">{t("autoplay")}</span>
        <div className="option__control switch">
          <SwitchButton {...userSettings} />
        </div>
      </div>

      {/* Смена языка */}
      <div className="settings__option">
        <img
          src={switchLanguage}
          alt={t("changeLanguage")}
          className="option__icon2"
        />
        <span className="option__label">{t("changeLanguage")}</span>
        <div className="option__control radio">
          <RadioLanguageSelectorBtn {...userSettings} />
        </div>
      </div>

      {/* Смена геолокации */}
      <Formik
        initialValues={{ city: defaultCity }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <div className="settings__option-column">
            <div className="settings__option-header">
              <img
                src={locationIcon}
                className="option__icon"
                alt={t("changeLocation")}
              />
              <span className="option__label">{t("changeLocation")}</span>
            </div>

            <AutocompleteInput
              name="city"
              value={values.city}
              onChange={async (val) => {
                setFieldValue("city", val);
                setTimeout(() => setFieldTouched("city", true), 0);
                if (val) {
                  try {
                    await editCity({ ...userData, city: val.label }).unwrap();
                    refetchUser();
                  } catch (error) {
                    console.error("Ошибка при обновлении города:", error);
                  }
                }
              }}
              onBlur={() => {}}
              error={touched.city ? (errors.city as string) : ""}
            />
          </div>
        )}
      </Formik>

      {/* Изменить возраст */}
      <div className="settings__option-column">
        <div className="settings__option-header">
          <img
            src={ageIcon}
            className="option__icon"
            alt={t("changeAgeRange")}
          />
          <span className="option__label">{t("changeAgeRange")}</span>
        </div>
        <AgeRangeSliderInput
          initialRange={ageRange}
          settings={userSettings}
          onChange={setAgeRange}
        />
      </div>

      {/* Подписка */}
      <div
        className="settings__option"
        onClick={() => navigate("/premiumSubscription")}
      >
        <img
          src={premiumIcon}
          alt={t("premiumAlt")}
          className="option__icon2"
        />
        <span className="option__label option__premium">
          {t("buy")} <span className="option__premium-font">Vibe Premium</span>
        </span>
      </div>

      <div className="settings__bottom-button">
        <ClassicButton
          name={t("logout")}
          type="button"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {isModalOpen && (
        <CustomModal
          onClose={() => setIsModalOpen(false)}
          onDelete={handleExit}
          description={t("logoutConfirm")}
          back={t("back")}
          action={t("logout")}
        />
      )}
    </>
  );
};
