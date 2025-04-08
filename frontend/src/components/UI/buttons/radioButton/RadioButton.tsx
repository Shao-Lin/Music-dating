import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { ChangeEvent } from "react";

interface RadioButtonProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

export const RadioButton = ({
  value,
  handleChange,
  error,
}: RadioButtonProps) => {
  return (
    <FormControl
      error={!!error}
      sx={{
        marginLeft: "30px",
        marginBottom: "20px",
      }}
    >
      <RadioGroup
        row
        aria-labelledby="gender-radio-buttons-group"
        name="gender"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Женский" />
        <FormControlLabel value="male" control={<Radio />} label="Мужской" />
      </RadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
