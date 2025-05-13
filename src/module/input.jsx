import { useState } from "react";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import SendButton from "./button";
import "./input.css";
import VoiceInputButton from "./voiceInput";

function ChatInput({ onSend, isLoading }) {
console.log("isLoading:", isLoading);
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

      {isLoading ? (
        <div className="d-flex align-items-center px-3">
          <Spinner animation="border" variant="light" size="sm" />
        </div>
      ) : (
        <SendButton onClick={handleSend} />
      )}
    </InputGroup>
  );
}

export default ChatInput;
