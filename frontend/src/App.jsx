import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  // currentUser: null = not logged in, object = logged in user
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return <ProfilePage user={currentUser} onLogout={handleLogout} />;
}