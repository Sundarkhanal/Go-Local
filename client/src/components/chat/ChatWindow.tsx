import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux";
import { ChatInput } from "./ChatInput";
import { useEffect } from "react";
import { socket } from "../../lib/socket/socket";
import { addMessage } from "../../reducers/ChatReducer";
import { formatDistanceToNow, format, isToday, isYesterday,  } from "date-fns";


const ChatWindow = () => {
  const { messages, selectedUser } = useAppSelector((state) => state.chat);
  const dispatch = useDispatch()
  useEffect(() => {
    socket.on("receive_message", (data:any) => {
        dispatch(addMessage(data))
    })
  })
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    if (isToday(date)) {
      return format(date, "hh:mm a")
    }
    if (isYesterday(date)) {
      return `Yesterday ${format(date, "hh:mm a")}`
    }
    return format(date,"MMM d, hh:mm a")
  }

  return (
    <div className="flex-1 flex flex-col p-4">
      {!selectedUser ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a user to start chatting
        </div>
      ) : (
        <>
          <h2 className="border-b p-3 font-semibold">{selectedUser.name}</h2>
          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {messages.map((msg: any, i: number) => (
              <div key={i} className="bg-gray-100 p-2 rounded">
                {msg.message}
                <div>
                <span className="text-xs text-gray-400">{formatMessageTime(msg.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ChatInput /> 
    </div>
  );
};

export default ChatWindow;