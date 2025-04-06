import TextareaAutosize from "@mui/material/TextareaAutosize";

export const TextArea = () => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      maxRows={4}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
  );
};
