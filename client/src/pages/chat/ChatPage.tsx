import ChatSidebar from "../../components/chat/ChatSidebar"
import ChatWindow from "../../components/chat/ChatWindow"

export const ChatPage = () => {
    return(
        <div className="flex h-screen">
            <ChatSidebar />
            <ChatWindow />
        </div>
    )
}