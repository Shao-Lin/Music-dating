import "../styles/main.scss";
import { SignUpForm } from "../components/forms/signUpForm/SignUpForm";
export const SignUpPage = () => {
  return (
    <>
      <header className="header-vibe-entry">Vibe</header>
      <main className="container">
        <SignUpForm />
      </main>
    </>
  );
};
