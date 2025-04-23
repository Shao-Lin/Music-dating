import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import type { FocusEventHandler } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

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
  error,
  helperText,
}: DateProps) => {
  const handleChange: DatePickerProps["onChange"] = (date) => {
    onChange(date ? date.toDate() : null);
  };

  return (
    <div style={{ margin: "0 30px 20px" }}>
      <DatePicker
        className={`custom-datepicker ${error ? "error" : ""}`}
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        format="DD.MM.YYYY"
        placeholder="Выберите дату рождения"
        style={{
          width: "100%",
          height: "52px",
          borderRadius: "50px",
          backgroundColor: "#ffe8f4",
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
          fontSize: "20px",
          fontWeight: "400",
          color: "#000000",
          //border: "1px solid rgb(182, 182, 182) ",
        }}
        status={error ? "error" : ""}
      />
      {helperText && (
        <div
          style={{
            color: "#d32f2f",
            fontSize: "12px",
            marginTop: "4px",
            marginLeft: "13px",
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};
