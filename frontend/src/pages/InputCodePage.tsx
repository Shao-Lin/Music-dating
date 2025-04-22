import { CodeInput } from "../components/UI/inputs/codeInput/CodeInput";
import { ClassicButton } from "../components/UI/buttons/classicButton/ClassicButton";
import { useState, useEffect } from "react";

export const InputCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [trueCode, setTrueCode] = useState("1234");

  const onComplete = (code: string) => {
    console.log("Введённый код:", code);
    if (trueCode !== code) {
      return false;
    }
    return true;
    //navigate
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

  const handleResendCode = () => {
    setIsLoading(true);
    setCountdown(30); // Устанавливаем таймер на 30 секунд
    const newCode = "1235";
    setTrueCode(newCode);
    // Здесь должна быть логика повторной отправки кода
    console.log("Запрос на повторную отправку кода...");
  };

  return (
    <>
      <header className="header-vibe-input-code">Vibe</header>
      <main>
        <div className="margin-15">
          <div className="sending-by-email-label">
            Мы отправили код для регистрации на вашу почту{" "}
            <b>user2004@gmail.com</b>.
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
          </div>
        </div>
      </main>
    </>
  );
};
