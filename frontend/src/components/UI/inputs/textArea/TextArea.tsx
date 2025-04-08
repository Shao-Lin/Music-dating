import { ChangeEvent } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

interface TextAreaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  error?: string | null;
}

export const TextArea = ({ value, onChange, name, error }: TextAreaProps) => {
  return (
    <FormControl
      error={!!error}
      sx={{
        width: "calc(100% - 60px)",
        margin: "0 30px 20px",
      }}
    >
      <TextareaAutosize
        name={name}
        value={value}
        onChange={onChange}
        minRows={5}
        maxRows={5}
        placeholder="Расскажите о себе"
        style={{
          border: `1px solid ${error ? "#d32f2f" : "rgba(0, 0, 0, 0.23)"}`, // MUI по умолчанию
          borderRadius: "35px",
          padding: "12px",
          fontSize: "16px",
          resize: "none",
          backgroundColor: "transparent",
          outline: "none",
          transition: "border-color 0.2s",
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = `2px solid ${
            error ? "#d32f2f" : "#1976d2"
          }`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = `1px solid ${
            error ? "#d32f2f" : "rgba(0, 0, 0, 0.23)"
          }`;
        }}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
