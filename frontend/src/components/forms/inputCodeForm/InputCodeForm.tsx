import { CodeInput } from "../../../components/UI/inputs/codeInput/CodeInput";
import { ClassicButton } from "../../../components/UI/buttons/classicButton/ClassicButton";
import { useState, useEffect } from "react";
import { useGetAuthCodeQuery } from "../../../api/authApi";
import { isFetchBaseQueryError } from "../../../utils/errorChecker";
import { useSendingEmailMutation } from "../../../api/authApi";
import { useAppSelector } from "../../../hooks/reduxHook";

export const InputCodeForm = () => {
  const { data: trueAuthCode } = useGetAuthCodeQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sendEmailError, setSendEmailError] = useState("");
  const [sendingEmail] = useSendingEmailMutation();
  const login = useAppSelector((state) => state.authUsers.login);

  const onComplete = (code: string) => {
    console.log("Введённый код:", code);
    if (trueAuthCode !== code) {
      return false;
    }
    return true;
  };

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
    setCountdown(30); // Устанавливаем таймер на 30 секунд
    // Здесь должна быть логика повторной отправки кода
    console.log("Запрос на повторную отправку кода...");

    try {
      await sendingEmail(login).unwrap(); // важно!
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if ("status" in error) {
          // Пример если API вернул JSON: { message: "Email не найден" }
          const errData = error.data as { message?: string };
          setSendEmailError(errData?.message || "Ошибка при отправке email");
        } else {
          setSendEmailError("Ошибка подключения к серверу");
        }
      } else if (error instanceof Error) {
        setSendEmailError(error.message);
      } else {
        setSendEmailError("Неизвестная ошибка");
      }
    }
  };

  return (
    <div className="margin-15">
      <div className="sending-by-email-label">
        Мы отправили код для регистрации на вашу почту <b>{login}</b>.
      </div>
      <div className="input-number-label">
        Введите 4-значный код, указанный в электронном письме
      </div>

      <CodeInput onComplete={onComplete} />
      <div className="button-code">
        <ClassicButton
          name={
            countdown > 0
              ? `Повторить через ${countdown} сек`
              : "Отправить повторно"
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
