import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const[unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios, authUser} = useContext(AuthContext);

    //function to get all users for sidebar - memoized to prevent unnecessary re-calls
    const getUsers = useCallback(async () => {
        try {
            const {data} = await axios.get('/api/messages/users');
            if(data.success){
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [axios]);

    //function to get messages for selected user - memoized to prevent unnecessary re-calls
    const getMessages = useCallback(async (userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [axios]);

    //function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(!data.success){
                toast.error(data.message);
            }
            // Don't manually add message here - socket will handle it
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to subscribe to messages for selected user
    const subscribeToMessages = useCallback(() => {
        if(!socket) return;

        socket.on("newMessage" , (newMessage) => {
            if (!newMessage || !newMessage.senderId) {
                console.warn("Invalid newMessage received from socket:", newMessage);
                return;
            }

            // Add message if it's part of the current conversation
            // (either you sent it to selectedUser OR selectedUser sent it to you)
            if(selectedUser && 
               (newMessage.senderId === selectedUser._id || 
                (newMessage.senderId === authUser?._id && newMessage.receiverId === selectedUser._id))){
                
                // Mark as seen if it's from the selected user (not your own message)
                if(newMessage.senderId === selectedUser._id){
                    newMessage.seen = true;
                    axios.put(`/api/messages/mark/${newMessage._id}`);
                }
                
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            } else if(newMessage.senderId !== authUser?._id) {
                // Only count unseen messages for messages you didn't send
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }));
            }
        })
    }, [socket, selectedUser, axios, authUser]);

    //function to unsubscribe from messages
    const unsubscribeFromMessages = useCallback(() => {
        if(socket) socket.off("newMessage");
    }, [socket]);

    useEffect(() => {
        // Fetch users only once when component mounts
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeFromMessages();

    }, [subscribeToMessages, unsubscribeFromMessages]);


    const value = {
        messages, users, selectedUser, getUsers, getMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages

    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}