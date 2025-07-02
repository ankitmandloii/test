import { useEffect, useState } from "react";
import { getMessages } from "../services/Api";
import socket from "../socket";
import { useAuth } from "../contexts/AuthContext";

export default function ChatWindow({ selectedUser }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id).then(res => setMessages(res.data));

    socket.off("receive-message").on("receive-message", (newMsg) => {
      if (newMsg.sender === selectedUser._id || newMsg.receiver === selectedUser._id) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });
  }, [selectedUser]);

  const sendMessage = () => {
    socket.emit("private-message", {
      senderId: user._id,
      receiverId: selectedUser._id,
      content: msg
    });
    setMessages([...messages, { sender: user._id, content: msg }]);
    setMsg("");
  };

  return selectedUser ? (
    <div>
      <h3>Chat with {selectedUser.userName}</h3>
      <div>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === user._id ? "right" : "left" }}>
            {m.content}
          </div>
        ))}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  ) : <div>Select a user to chat</div>;
}
