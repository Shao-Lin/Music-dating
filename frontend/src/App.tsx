import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { QuestionnairePage } from "./pages/QuestionnairePage";
import { Profile } from "./pages/Profile";
import { BottomMenu } from "./components/navigation/bottomMenu/BottomMenu";
import { MatchFeed } from "./pages/MatchFeed";
import { ListOfChats } from "./pages/ListOfChats";
import { ListOfMatches } from "./pages/ListOfMatches";
import { InputCode } from "./pages/InputCodePage";
import { ChatPage } from "./pages/ChatPage";
//import { RequireAuth } from "./utils/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/inputCode" element={<InputCode />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />

        <Route path="/chat" element={<ChatPage />} />

        <Route element={<BottomMenu />}>
          <Route path="matchFeed" element={<MatchFeed />} />
          <Route path="listChat" element={<ListOfChats />} />
          <Route path="listMatch" element={<ListOfMatches />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
