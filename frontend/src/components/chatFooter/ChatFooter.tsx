import { useRef, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import photoIcon from "../../assets/chat/addImage.png";
import sendIcon from "../../assets/chat/sendMessage.png";
import { useAddMessageMutation } from "../../api/chatApi";
import { useTranslation } from "react-i18next";

type FormValues = {
  message: string;
  files: File[];
};
type ChatProp = {
  chatId: string;
};

export const ChatFooter = ({ chatId }: ChatProp) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const { t } = useTranslation();

  const initialValues: FormValues = { message: "", files: [] };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();

    if (values.message.trim()) {
      formData.append("text", values.message);
    }

    if (values.files.length > 0) {
      values.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      await addMessage({ chatId, formData }).unwrap();
    } catch (error) {
      console.error(error);
    }

    resetForm();
    setImagePreview(null);
  };

  return (
    <>
      {imagePreview && (
        <div className="chat-footer__preview">
          <img src={imagePreview} alt={t("chatFooter.previewImageAlt")} />
        </div>
      )}

      <div className="chat-footer">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values, isSubmitting }) => {
            const isButtonDisabled =
              isLoading ||
              isSubmitting ||
              (values.message.trim() === "" && values.files.length === 0);

            return (
              <Form className="chat-footer__form">
                <button
                  type="button"
                  className="chat-footer__photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img src={photoIcon} alt={t("chatFooter.addImageAlt")} />
                </button>

                <input
                  name="files"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("files", [file]);
                      const url = URL.createObjectURL(file);
                      setImagePreview(url);
                    }
                  }}
                />

                <Field
                  name="message"
                  placeholder={t("chatFooter.placeholder")}
                  className="chat-footer__input"
                />

                <button
                  disabled={isButtonDisabled}
                  type="submit"
                  className="chat-footer__send-btn"
                >
                  <img src={sendIcon} alt={t("chatFooter.sendMessageAlt")} />
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
