import "../styles/main.scss";
import { QuestionnaireForm } from "../components/forms/questionnaireForm/QuestionnaireForm";
export const QuestionnairePage = () => {
  return (
    <>
      <header className="header-questionnaire">Анкета</header>
      <main className="container">
        <QuestionnaireForm />
      </main>
    </>
  );
};
