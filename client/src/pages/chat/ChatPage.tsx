import { useEffect } from "react"
import ChatSidebar from "../../components/chat/ChatSidebar"
import ChatWindow from "../../components/chat/ChatWindow"
import { useAuth } from "../../context/AuthContext"
import { socket } from "../../lib/socket/socket"

export const ChatPage = () => {
    const {user} = useAuth()

    useEffect(() => {
        if (user?._id) {
            socket.connect()
            socket.emit("join", user._id)
        }
        return () => {
            socket.disconnect()
        }
    }, [user])
    return(
        <div className="flex h-screen">
            <ChatSidebar />
            <ChatWindow />
        </div>
    )
}