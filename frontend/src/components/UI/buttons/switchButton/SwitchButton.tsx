import React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useEditSettingsMutation } from "../../../../api/settingsAndEditProfileApi";
import { userSettingsProps } from "../../../../pages/SettingsPage";

const PinkSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FE6D87",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#FE6D87",
  },
}));

export const SwitchButton = ({
  lang,
  ageFrom,
  ageTo,
  subActive,
  activeFrom,
  activeTo,
  autoplay,
}: userSettingsProps) => {
  const [editAutoplay] = useEditSettingsMutation();
  const [autoplayEdit, setAutoplayEdit] = React.useState(autoplay);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setAutoplayEdit(newValue); // обновляем UI сразу

    try {
      await editAutoplay({
        lang,
        ageFrom,
        ageTo,
        subActive,
        activeFrom,
        activeTo,
        autoplay: newValue, // ✅ передаём новое значение
      }).unwrap();
    } catch (error) {
      console.error(error);
      setAutoplayEdit(!newValue); // ❗ при ошибке откатываем
    }
  };

  return (
    <PinkSwitch
      checked={autoplayEdit}
      onChange={handleChange}
      slotProps={{
        input: { "aria-label": "controlled" },
      }}
    />
  );
};
