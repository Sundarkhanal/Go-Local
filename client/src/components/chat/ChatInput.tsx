import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { toast } from "sonner"
import axiosInstance from "../../lib/http/axios.config"
import { addMessage } from "../../reducers/ChatReducer"

export const ChatInput = () => {
    const [text, setText] = useState("")
    const dispatch = useAppDispatch()
    const selectedUser = useAppSelector((s) => s.chat.selectedUser)
    
    const handleSend = async() => {
        if (!text.trim()) {
            return
        }
        if (!selectedUser) {
            toast.error("Select the user first");
            return;
        }
        try {
            const res = await axiosInstance.post("/chat", {
                receiverId: selectedUser._id,
                text
            });
            dispatch(addMessage(res.data.data))
            setText("")
        } catch (error) {
            console.log(error);
            toast.error("Failed to send Message")   
        }
    }
    return(
        <div className="flex gap-2 mt-4">
            <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message.."
            className="flex-1 border rounded px-3 py-2"
             />
            
            <button
            onClick={handleSend}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >Send</button>
        </div>
    )
}