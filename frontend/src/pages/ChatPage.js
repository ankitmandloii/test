import { useEffect, useState } from "react";
import { getUsers } from "../services/Api";
import { useAuth } from "../contexts/AuthContext";
import socket from "../socket";
import UserList from "../components/UserList";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.emit("register", user._id);

    getUsers().then(res => setUsers(res.data));

    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <UserList users={users} selectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}
