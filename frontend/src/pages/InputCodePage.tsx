import { CodeInput } from "../components/UI/inputs/codeInput/CodeInput";
export const InputCode = () => {
  return (
    <>
      <header className="header-vibe-input-code">Vibe</header>
      <main>
        <div className="margin-15">
          <div className="sending-by-email-label">
            Мы отправили код для регистрации на вашу почту{" "}
            <b>user2004@gmail.com</b> .
          </div>
          <div className="input-number-label">
            Введите 4-значный код, указанный в электронном письме
          </div>
        </div>
        <CodeInput onComplete={(code) => console.log("Введённый код:", code)} />
      </main>
    </>
  );
};
