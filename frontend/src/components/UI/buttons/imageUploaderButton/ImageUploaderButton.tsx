import { useState } from "react";
import { Avatar } from "@mui/material";
import "./_imageUploader.scss";
import plusImage from "../../../../assets/plusImage.svg";
import { useTranslation } from "react-i18next";

interface ImageUploaderProps {
  onImageUpload?: (file: File, preview: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload = () => {},
}: ImageUploaderProps) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
        onImageUpload(file, reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="image-uploader">
      <input
        accept="image/*"
        id="upload-photo"
        type="file"
        className="image-uploader__input"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-photo" className="image-uploader__label">
        <div className="image-uploader__button">
          <img src={plusImage} alt="" className="image-uploader__icon" />
          <span className="image-uploader__text">
            {t("questionnairePage.uploadPhoto")}
          </span>
        </div>
      </label>
      {preview && (
        <Avatar
          src={preview}
          className="image-uploader__preview"
          variant="rounded"
        />
      )}
    </div>
  );
};
