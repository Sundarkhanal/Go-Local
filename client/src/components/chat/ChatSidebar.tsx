import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import axiosInstance from "../../lib/http/axios.config";
import { setMessages, setSelectedUser, setUsers } from "../../reducers/ChatReducer";
import { useEffect } from "react";

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const avatarColors = [
  { bg: "#E1F5EE", text: "#0F6E56" },
  { bg: "#EEEDFE", text: "#534AB7" },
  { bg: "#FAECE7", text: "#993C1D" },
  { bg: "#E6F1FB", text: "#185FA5" },
  { bg: "#FAEEDA", text: "#854F0B" },
];

interface User {
  _id: string;
  name: string;
  email: string;
}


const ChatSidebar = () => {
  const dispatch = useAppDispatch();
  const users: User[] = (useAppSelector((state) => state.chat.users) ?? []) as User[];
  const selectedUser = useAppSelector((state) => state.chat.selectedUser);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/chat/user-list");
      dispatch(setUsers(res.data.data));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      const res = await axiosInstance.get(`/chat/${userId}`);
      dispatch(setMessages(res.data.data));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 w-1/3">

      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-3">Messages</h2>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" className="text-gray-400">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
            placeholder="Search users..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
        {users.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-8">No users found</p>
        ) : (
          users.map((user, index) => {
            const color = avatarColors[index % avatarColors.length];
            const isActive = selectedUser?._id === user._id;

            return (
              <div
                key={user._id}
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  fetchMessages(user._id);
                }}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer relative transition-colors
                  ${isActive ? "bg-emerald-50" : "hover:bg-gray-50"}`}
              >
                {isActive && (
                  <div className="absolute left-0 top-[20%] h-[60%] w-0.5 bg-emerald-500 rounded-r" />
                )}

                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                  style={{ background: color.bg, color: color.text }}
                >
                  {getInitials(user.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm  font-bold truncate ${isActive ? "text-emerald-700" : "text-gray-800"}`}>
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;