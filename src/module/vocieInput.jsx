import { useState, useRef } from "react";
import { Button } from "react-bootstrap";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function VoiceInputButton({ onResult }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const toggleListening = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.continuous = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
      };

      recognitionRef.current.onerror = (e) => {
        console.error("Speech error:", e);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <Button
      variant="outline-light"
      className="bg-transparent border-0 text-white"
      onClick={toggleListening}
    >
      <i className={`bi ${listening ? "bi-mic-mute-fill" : "bi-mic-fill"}`}></i>
    </Button>
  );
}

export default VoiceInputButton;
