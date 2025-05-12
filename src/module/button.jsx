import { Button } from "react-bootstrap";

function SendButton({ onClick }) {
  return (
    <Button variant="outline-light" className="border-0" onClick={onClick}>
      <i className="bi bi-arrow-right"></i>
    </Button>
  );
}

export default SendButton;
