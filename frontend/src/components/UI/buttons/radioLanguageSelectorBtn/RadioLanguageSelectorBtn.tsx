import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

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
interface PropsLanguage {
  language: string;
}
export const RadioLanguageSelectorBtn = ({ language }: PropsLanguage) => {
  const [value, setValue] = useState(language);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <RadioGroup row name="language" value={value} onChange={handleChange}>
      <FormControlLabel value="Russian" control={<PinkRadio />} label="ru" />
      <FormControlLabel value="English" control={<PinkRadio />} label="en" />
    </RadioGroup>
  );
};
