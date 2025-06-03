import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import React from "react";
import { useEditSettingsMutation } from "../../../../api/settingsAndEditProfileApi";
import { userSettingsProps } from "../../../../pages/SettingsPage";

interface AgeRangeSettingProps {
  initialRange: [number, number];
  settings: userSettingsProps; // 👈 получаем текущие настройки
  onChange: (range: [number, number]) => void;
}

export const AgeRangeSliderInput = ({
  initialRange,
  settings,
  onChange,
}: AgeRangeSettingProps) => {
  const [value, setValue] = React.useState<[number, number]>(initialRange);
  const [editSettings] = useEditSettingsMutation();

  const handleChange = (_: Event, newValue: number | number[]) => {
    const range = newValue as [number, number];
    setValue(range);
    onChange(range); // обновляем локально
  };

  const handleChangeCommitted = async () => {
    try {
      await editSettings({
        ...settings,
        ageFrom: value[0],
        ageTo: value[1],
      }).unwrap();
      console.log("Возрастной диапазон обновлён:", value);
    } catch (error) {
      console.error("Ошибка при обновлении настроек:", error);
    }
  };

  return (
    <Box sx={{ width: "calc(100% - 60px)", margin: "0 30px" }}>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted} // 👈 отправка при отпускании
        valueLabelDisplay="auto"
        min={18}
        max={100}
        getAriaLabel={() => "Возрастной диапазон"}
        sx={{
          color: "#FE6D87",
          "& .MuiSlider-track": {
            backgroundColor: "#FE6D87",
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "#FE6D87",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#FF9EB0",
          },
        }}
      />
    </Box>
  );
};
