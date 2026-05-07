import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux";
import { ChatInput } from "./ChatInput";
import { useEffect, useRef } from "react";
import { socket } from "../../lib/socket/socket";
import { addMessage } from "../../reducers/ChatReducer";
import { format, isToday, isYesterday } from "date-fns";
import { useAuth } from "../../context/AuthContext";

const ChatWindow = () => {
  const { messages, selectedUser } = useAppSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleReceiveMessage = (data:any) => {
      console.log("received_message",data);
      const formattedMessage = {
        ...data,
        message: data.message || data.text || ""
      }
      
      dispatch(addMessage(formattedMessage))
    }
      socket.off("receive_message");
      socket.on("receive_message", handleReceiveMessage);

      return () => {
        socket.off("receive_message", handleReceiveMessage)
      };
    }, []);

  //Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date))
      return format(date, "hh:mm a");
    if (isYesterday(date))
      return `Yesterday ${format(date, "hh:mm a")}`;
    return format(date, "MMM d, hh:mm a");
  };

  return (
    <div className="flex-1 flex flex-col p-4">
      {!selectedUser ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a user to start chatting
        </div>
      ) : (
        <>
          <h2 className="border-b pb-3 font-semibold">{selectedUser.name}</h2>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((msg: any) => {
              const isSender = msg.sender?._id === user?._id ||
              msg.sender === user?._id
              return (
                <div
                  key={msg._id}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      isSender
                        ? "bg-teal-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className={`text-xs mt-1 block ${isSender ? "text-teal-100" : "text-gray-400"}`}>
                      {formatMessageTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </>
      )}
      <ChatInput />
    </div>
  );
};

export default ChatWindow;