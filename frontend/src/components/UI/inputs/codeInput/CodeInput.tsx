import { useRef, useState } from "react";

type CodeInputProps = {
  onComplete?: (code: string) => boolean; // callback, когда все 4 цифры введены
};

export const CodeInput = ({ onComplete }: CodeInputProps) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");

  const handleChange = (value: string, index: number) => {
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
      const success = onComplete?.(fullCode);
      if (!success) {
        setError("Неверный код. Попробуйте снова.");
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
