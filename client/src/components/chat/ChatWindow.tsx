import { useAppSelector } from "../../hooks/useRedux";
import { ChatInput } from "./ChatInput";

const ChatWindow = () => {
  const { messages, selectedUser } = useAppSelector((state) => state.chat);
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
                {msg.text}
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