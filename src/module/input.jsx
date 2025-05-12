import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import SendButton from "./button";
import "./input.css";
import VoiceInputButton from "./vocieInput";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  const handleVoiceInput = (text) => {
    setMessage((prev) => (prev ? `${prev} ${text}` : text));
  };

  return (
    <InputGroup className="custom-input rounded-pill">
      <VoiceInputButton onResult={handleVoiceInput} />

      <Form.Control
        placeholder="Ask whatever you want"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="bg-transparent border-0 text-white"
      />

      <SendButton onClick={handleSend} />
    </InputGroup>
  );
}

export default ChatInput;
