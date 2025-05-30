import { Routes, Route, Navigate } from "react-router";
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
import { EditProfile } from "./pages/EditProfile";
import { SettingsPage } from "./pages/SettingsPage";
import { PremiumSubscription } from "./pages/PremiumSubscription";
import { InfoPage } from "./pages/guestPages/info/InfoPage";
import { LimitPage } from "./pages/guestPages/limit/LimitPage";
import { UserLimitPage } from "./pages/UserLimitPage";
import { WaitingPage } from "./pages/servicePages/waiting/WaitingPage";
import { ErrorPage } from "./pages/servicePages/error/ErrorPage";
import { MatchFeedGuest } from "./pages/guestPages/MatchFeedGuest";
import { BottomMenuGuest } from "./components/navigation/bottomMenuGuest/BottomMenuGuest";
//import { RequireAuth } from "./utils/RequireAuth";

import { useYandexPageview } from "./hooks/useYandexPageview";
import { YandexMetrika } from "./YandexMetrika";

function App() {
  useYandexPageview();
  return (
    <>
      <YandexMetrika />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/inputCode" element={<InputCode />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />

        <Route path="chat/:chatId" element={<ChatPage />} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="premiumSubscription" element={<PremiumSubscription />} />

        <Route path="infoPage" element={<InfoPage />} />
        <Route path="guestLimit" element={<LimitPage />} />
        <Route element={<BottomMenuGuest />}>
          <Route path="introductoryFeed" element={<MatchFeedGuest />} />
        </Route>

        <Route path="waiting" element={<WaitingPage />} />
        <Route path="error" element={<ErrorPage />} />

        <Route element={<BottomMenu />}>
          <Route path="matchFeed" element={<MatchFeed />} />
          <Route path="listChat" element={<ListOfChats />} />
          <Route path="listMatch" element={<ListOfMatches />} />
          <Route path="profile" element={<Profile />} />
          <Route path="userLimit" element={<UserLimitPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
