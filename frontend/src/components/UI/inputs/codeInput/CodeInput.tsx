import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSendingAuthCodeMutation } from "../../../../api/authApi";
import { useAppSelector } from "../../../../hooks/reduxHook";

export const CodeInput = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [sendingCode] = useSendingAuthCodeMutation();
  const login = useAppSelector((state) => state.authUsers.login);

  const handleChange = async (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // только цифры или пусто

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(""); // очистить ошибку при вводе

    // если ввели цифру — переходим к следующему инпуту
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    // если код полный, вызываем onComplete
    const fullCode = newCode.join("");
    if (fullCode.length === 4 && !newCode.includes("")) {
      const codeWithEmail = {
        email: login,
        code: fullCode,
      };
      try {
        const response = await sendingCode(codeWithEmail).unwrap();
        console.log("Успех:", response);
        if (response.data) {
          navigate("/questionnaire");
        } else {
          setError("Неверный код. Попробуйте снова.");
        }
      } catch (error) {
        console.error("Ошибка:", error);
        setError("Ошибка сервера");
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevIndex = index - 1;
      inputsRef.current[prevIndex]?.focus();
      const newCode = [...code];
      newCode[prevIndex] = "";
      setCode(newCode);
    }
  };

  return (
    <div>
      <div className="code-input-container">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            className="code-input-box"
          />
        ))}
      </div>
      {error && <div className="form-error-code-input">{error}</div>}
    </div>
  );
};
