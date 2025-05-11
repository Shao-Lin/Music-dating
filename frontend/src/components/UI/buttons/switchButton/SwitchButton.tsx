import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const PinkSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FE6D87",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#FE6D87",
  },
}));

interface PropsAutoplay {
  isAutoplay: boolean;
}

export const SwitchButton = ({ isAutoplay }: PropsAutoplay) => {
  const [checked, setChecked] = useState(isAutoplay);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <PinkSwitch
      checked={checked}
      onChange={handleChange}
      slotProps={{
        input: { "aria-label": "controlled" },
      }}
    />
  );
};
