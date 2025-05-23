import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatInput from "./module/input";

function App() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message) => {
    setIsLoading(true);
    setResponse(null);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.reply || "No reply.");
    } catch (err) {
      console.error("API Error:", err);
      setResponse("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="textDiv">
      <div className="icon-circle mb-4">
        <i className="bi bi-chat-left"></i>
      </div>
      <h1 className="fw-bold mb-2">Hi there!</h1>
      <h2 className="fw-semibold fs-4 mb-3">What would you like to know?</h2>
      <p className="small mb-4">
        Use one of the most common prompts below<br />
        or ask your own question
      </p>

      <ChatInput onSend={handleSend} isLoading={isLoading} />

      {response && (
        <div className="mt-4 p-3 bg-dark text-light rounded">
          <strong>Assistant:</strong>
          <p>{response}</p>
        </div>
      )}
    </Container>
  );
}

export default App;
