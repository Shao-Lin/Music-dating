import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import React from "react";

interface AgeRangeSettingProps {
  initialRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export const AgeRangeSliderInput = ({
  initialRange,
  onChange,
}: AgeRangeSettingProps) => {
  const [value, setValue] = React.useState<[number, number]>(initialRange);

  const handleChange = (_: Event, newValue: number | number[]) => {
    const range = newValue as [number, number];
    setValue(range);
    onChange(range);
  };

  return (
    <Box sx={{ width: "calc(100% - 60px)", margin: "0 30px" }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={18}
        max={100}
        getAriaLabel={() => "Возрастной диапазон"}
        sx={{
          color: "#FE6D87", // основной цвет (ползунок, трек, активные элементы)
          "& .MuiSlider-track": {
            backgroundColor: "#FE6D87",
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "#FE6D87",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#FF9EB0", // неактивный трек (можно поменять)
          },
        }}
      />
    </Box>
  );
};
