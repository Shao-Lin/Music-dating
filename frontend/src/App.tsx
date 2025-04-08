import { Routes, Route, BrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { QuestionnairePage } from "./pages/QuestionnairePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
