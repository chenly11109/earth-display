import "./index.css";
import { useNavigate } from "react-router-dom";

export default function CreateButton() {
  const navigate = useNavigate();
  return (
    <div
      className="create_button"
      onClick={() => {
        navigate("../addNewWorkflow");
      }}
    >
      CREATE
    </div>
  );
}
