import { createSlice } from "@reduxjs/toolkit";

interface User {
    _id: string,
    name:string

}

interface ChatState{
    users: User[],
    messages: any[];
    selectedUser: any | null,
    unreadCount:any
}
const initialState:ChatState ={
    users: [],
    messages:[],
    selectedUser: null,
    unreadCount: 0
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers:{
        setUsers: (state, action) => {
            state.users = Array.isArray(action.payload) ? action.payload : []
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        increaseUnread: (state) => {
        state.unreadCount += 1;
        },

        resetUnread: (state) => {
        state.unreadCount = 0;
        }
    }

});

export const {setUsers, setMessages, setSelectedUser, addMessage, increaseUnread, resetUnread} = chatSlice.actions
export default chatSlice.reducer
