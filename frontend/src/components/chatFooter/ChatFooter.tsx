import { useRef, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import photoIcon from "../../assets/chat/addImage.png";
import sendIcon from "../../assets/chat/sendMessage.png";
import { useAppSelector } from "../../hooks/reduxHook";
import { useAddMessageMutation } from "../../api/messagesApi";

type FormValues = {
  message: string | null;
  file: File | null;
};

export const ChatFooter = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const id = useAppSelector((state) => state.setDataUser.userId);
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const initialValues: FormValues = { message: "", file: null };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();
    if (id !== null) {
      formData.append("senderId", id.toString());
    }

    if (values.message) {
      formData.append("message", values.message);
    }

    if (values.file) {
      formData.append("file", values.file);
    }
    console.log(formData);
    try {
      await addMessage(formData).unwrap();
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
          <img src={imagePreview} alt="preview" />
        </div>
      )}

      <div className="chat-footer">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values, isSubmitting }) => {
            const isButtonDisabled =
              isLoading ||
              isSubmitting ||
              (!values.message?.trim() && !values.file);

            return (
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

                <button
                  disabled={isButtonDisabled}
                  type="submit"
                  className="chat-footer__send-btn"
                >
                  <img src={sendIcon} alt="send" />
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
