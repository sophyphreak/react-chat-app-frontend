import React from "react";
import { io } from "socket.io-client";

import "./App.css";

const socket = io("ws://localhost:5000");

function App() {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState("");

  React.useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log(msg);
      setMessages((messages) => [...messages, msg]);
      window.scrollTo(0, document.body.scrollHeight);
    });
    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  return (
    <>
      <ul id="messages">
        {messages.map(({ message, timeString }) => (
          <li key={timeString}>{message}</li>
        ))}
      </ul>
      <form id="form" action="">
        <input
          id="input"
          autoComplete="off"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            socket.emit("chat message client speaking", inputMessage);
            setInputMessage("");
          }}
        >
          Send
        </button>
      </form>
    </>
  );
}

export default App;
