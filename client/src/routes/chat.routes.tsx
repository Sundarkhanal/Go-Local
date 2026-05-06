import { Routes, Route } from "react-router-dom";
import { ChatPage } from "../pages/chat/ChatPage";

export const ChatRoutes = () => {
  return (
    <Routes>
      <Route index element={<ChatPage />} />
    </Routes>
  );
};