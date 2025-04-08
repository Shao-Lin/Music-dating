import { MobileDatePicker } from "@mui/x-date-pickers";
import { FocusEventHandler } from "react";

export interface DateProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  helperText: string | false | undefined;
}

export const DateInput = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: DateProps) => {
  return (
    <MobileDatePicker
      label="Выберите дату рождения"
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          error: error,
          helperText: helperText,
          onBlur: onBlur,
        },
      }}
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
