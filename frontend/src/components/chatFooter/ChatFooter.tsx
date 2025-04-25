import { useRef, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import photoIcon from "../../assets/addImage.png";
import sendIcon from "../../assets/sendMessage.png";

type FormValues = {
  message: string;
  file: File | null;
};

export const ChatFooter = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialValues: FormValues = { message: "", file: null };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();
    formData.append("message", values.message);
    if (values.file) {
      formData.append("file", values.file);
    }

    // Пример отправки
    console.log("Сообщение:", values.message);
    if (values.file) {
      console.log("Файл:", values.file.name);
    }

    // Отправка может быть например так:
    // await fetch('/api/send-message', {
    //   method: 'POST',
    //   body: formData,
    // });

    resetForm();
    setImagePreview(null);
  };

  return (
    <>
      {imagePreview && (
        <div className="chat-footer__preview">
          <img src={imagePreview} alt="preview" />
        </div>
      )}

      <div className="chat-footer">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="chat-footer__form">
              <button
                type="button"
                className="chat-footer__photo-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={photoIcon} alt="add" />
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFieldValue("file", file);
                    const url = URL.createObjectURL(file);
                    setImagePreview(url);
                  }
                }}
              />

              <Field
                name="message"
                placeholder="Введите сообщение..."
                className="chat-footer__input"
              />

              <button type="submit" className="chat-footer__send-btn">
                <img src={sendIcon} alt="send" />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
