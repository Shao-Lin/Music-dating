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

export const Settings = ({
  isAutoplay,
  city,
  language,
  rangeAge,
}: userSettingsProps) => {
  const [logout] = useLogoutMutation();
  const defaultCity: CityOption = { label: city };
  const [ageRange, setAgeRange] = useState<[number, number]>(rangeAge);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    city: Yup.object()
      .nullable()
      .shape({
        label: Yup.string().required("Город обязателен"),
      })
      .required("Город обязателен"),
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
        <img src={autoPlay} alt="Автопроигрывание" className="option__icon" />
        <span className="option__label">Автопроигрывание трека</span>
        <div className="option__control switch">
          <SwitchButton isAutoplay={isAutoplay} />
        </div>
      </div>

      {/* Смена языка */}
      <div className="settings__option">
        <img
          src={switchLanguage}
          alt="Сменить язык"
          className="option__icon2"
        />
        <span className="option__label">Сменить язык</span>
        <div className="option__control radio">
          <RadioLanguageSelectorBtn language={language} />
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
              <img src={locationIcon} className="option__icon" alt="Гео" />
              <span className="option__label">Сменить геолокацию</span>
            </div>

            <AutocompleteInput
              name="city"
              value={values.city}
              onChange={(val) => {
                setFieldValue("city", val); // Сначала обновляем значение
                setTimeout(() => setFieldTouched("city", true), 0); // Затем touched, чтобы избежать race condition

                if (val) {
                  console.log("Выбранный город:", val.label);
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
          <img src={ageIcon} className="option__icon" alt="Возраст" />
          <span className="option__label">Изменить возрастной диапазон</span>
        </div>
        <AgeRangeSliderInput initialRange={ageRange} onChange={setAgeRange} />
      </div>

      {/* Купить подписку */}
      <div
        className="settings__option"
        onClick={() => navigate("/premiumSubscription")}
      >
        <img
          src={premiumIcon}
          alt="Подписка премиум"
          className="option__icon2"
        />
        <span className="option__label option__premium ">
          Купить <span className="option__premium-font">Vibe Premium</span>
        </span>
      </div>

      <div className="settings__bottom-button">
        <ClassicButton
          name="Выйти из аккаунта"
          type="button"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      {isModalOpen && (
        <CustomModal
          onClose={() => setIsModalOpen(false)}
          onDelete={handleExit}
          description="Вы действительно хотите выйти?"
          back="Назад"
          action="Выйти"
        />
      )}
    </>
  );
};
