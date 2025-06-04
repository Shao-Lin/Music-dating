import { cities } from "./cities";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTranslation } from "react-i18next";

export interface CityOption {
  label: string;
}

interface AutocompleteInputProps {
  name: string;
  value: CityOption | null;
  onChange: (value: CityOption | null) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
}

export const AutocompleteInput = ({
  name,
  value,
  onChange,
  onBlur,
  error,
}: AutocompleteInputProps) => {
  const { t } = useTranslation();
  return (
    <Autocomplete
      disablePortal
      options={cities}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      isOptionEqualToValue={(option, value) => option.label === value?.label}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={t("questionnairePage.cityLabel")}
          onBlur={onBlur}
          error={!!error}
          helperText={error}
        />
      )}
      sx={{
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
        width: "calc(100% - 60px)",
        height: "52px",
        margin: "0 30px 20px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          height: "52px",
        },
      }}
    />
  );
};
