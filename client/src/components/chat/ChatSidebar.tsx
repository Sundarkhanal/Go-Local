import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import axiosInstance from "../../lib/http/axios.config";
import { setMessages, setSelectedUser, setUsers } from "../../reducers/ChatReducer";
import { useEffect } from "react";

const ChatSidebar = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.chat.users ) ?? [];

    const fetchUsers = async() => {
        try {
            const res = await axiosInstance.get("/chat/user-list")
            dispatch(setUsers(res.data.data))

        } catch (error) {
            console.log(error);
        }
    }
    const fetchMessages = async (userId: string) => {
        try {
            const res = await axiosInstance.get(`/chat/${userId}`);
            dispatch(setMessages(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers()
    }, []);

    return(
        <div className="w-1/3 border-r p-4">
            <h2 className="font-bold mb-4">Users</h2>
            {users.map((user:any) => (
                <div 
                key={user._id}
                onClick={() => {dispatch(setSelectedUser(user));
                    fetchMessages(user._id)
                }}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                >
                    {user.name}
                </div>
            ))}
        </div>
    )
}

export default ChatSidebar