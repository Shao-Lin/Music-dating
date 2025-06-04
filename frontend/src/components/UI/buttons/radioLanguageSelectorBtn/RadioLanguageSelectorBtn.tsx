import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { userSettingsProps } from "../../../../pages/SettingsPage";
import { useEditSettingsMutation } from "../../../../api/settingsAndEditProfileApi";
import { useTranslation } from "react-i18next";

const PinkRadio = styled(Radio)(() => ({
  width: 15,
  height: 15,
  padding: 20,
  "& .MuiSvgIcon-root": {
    fontSize: 24,
  },
  "&.Mui-checked": {
    color: "#FE6D87", // розовый цвет
  },
}));

export const RadioLanguageSelectorBtn = ({
  lang,
  ageFrom,
  ageTo,
  subActive,
  activeFrom,
  activeTo,
  autoplay,
}: userSettingsProps) => {
  const { i18n } = useTranslation();
  const [editLang] = useEditSettingsMutation();
  const [langEdit, setlangEdit] = useState(lang);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    i18n.changeLanguage(newValue);
    console.log(newValue);
    setlangEdit(newValue); // обновляем UI сразу

    try {
      await editLang({
        lang: newValue,
        ageFrom,
        ageTo,
        subActive,
        activeFrom,
        activeTo,
        autoplay,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RadioGroup row name="language" value={langEdit} onChange={handleChange}>
      <FormControlLabel value="ru" control={<PinkRadio />} label="ru" />
      <FormControlLabel value="en" control={<PinkRadio />} label="en" />
    </RadioGroup>
  );
};
