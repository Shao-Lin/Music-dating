import { CodeInput } from "../../../components/UI/inputs/codeInput/CodeInput";
import { ClassicButton } from "../../../components/UI/buttons/classicButton/ClassicButton";
import { useState, useEffect } from "react";

import { isFetchBaseQueryError } from "../../../utils/errorChecker";
import { useSendingEmailMutation } from "../../../api/authApi";
import { useAppSelector } from "../../../hooks/reduxHook";
import { useTranslation, Trans } from "react-i18next";

export const InputCodeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sendEmailError, setSendEmailError] = useState("");
  const [sendingEmail] = useSendingEmailMutation();
  const login = useAppSelector((state) => state.authUsers.login);
  const { t } = useTranslation();

  // Таймер обратного отсчета
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [countdown]);

  const handleResendCode = async () => {
    setIsLoading(true);
    setCountdown(30);

    try {
      await sendingEmail(login).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if ("status" in error) {
          const errData = error.data as { message?: string };
          if (errData?.message === "Email не найден") {
            setSendEmailError(t("inputCodePage.errors.emailNotFound"));
          } else {
            setSendEmailError(t("inputCodePage.errors.sendError"));
          }
        } else {
          setSendEmailError(t("inputCodePage.errors.networkError"));
        }
      } else if (error instanceof Error) {
        setSendEmailError(error.message);
      } else {
        setSendEmailError(t("inputCodePage.errors.unknownError"));
      }
    }
  };

  return (
    <div className="margin-15">
      <div className="sending-by-email-label">
        <Trans
          i18nKey="inputCodePage.emailSent"
          values={{ email: login }}
          components={[<b key="1" />]}
        />
      </div>
      <div className="input-number-label">{t("inputCodePage.enterCode")}</div>

      <CodeInput />
      <div className="button-code">
        <ClassicButton
          name={
            countdown > 0
              ? t("inputCodePage.resendIn", { seconds: countdown })
              : t("inputCodePage.resend")
          }
          type="button"
          isLoading={isLoading}
          onClick={handleResendCode}
        />
        {sendEmailError && <div className="form-error">{sendEmailError}</div>}
      </div>
    </div>
  );
};
