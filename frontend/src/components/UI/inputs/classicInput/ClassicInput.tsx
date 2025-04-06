import TextField from "@mui/material/TextField";
import { ChangeEvent, FocusEvent } from "react";

interface ClassicInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
}

export const ClassicInput = ({
  name,
  value,
  onChange,
  onBlur,
  error,
}: ClassicInputProps) => {
  return (
    <TextField
      name={name}
      label="Введите логин"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={!!error}
      helperText={error}
      className="input-classic"
      sx={{
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
        width: "calc(100% - 60px)",
        height: "52px",
        margin: "0 30px",
        marginBottom: "20px",
        flex: "1 1 auto",

        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          height: "52px",
        },
      }}
    />
  );
};
