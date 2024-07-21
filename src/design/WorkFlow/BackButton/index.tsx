import "./index.css";
import { useNavigate } from "react-router-dom";

export function BackButton({ history }: { history: string }) {
  const navigate = useNavigate();
  return (
    <div
      className="back_button"
      onClick={() => {
        navigate(history);
      }}
    >
      &lt;Back
    </div>
  );
}
