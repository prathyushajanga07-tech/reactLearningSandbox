
import { useState } from "react";
import "./StudentCard.css";

function StudentCard({ name, course, cgpa, onDelete, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleClick() {
    setShowDetails(!showDetails);
  }

  return (
    <div className="student-card">
      <h2>{name}</h2>
      <p>Course: {course}</p>

      <button onClick={handleClick}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && <p>CGPA: {cgpa}</p>}
      
      <button
        onClick={() => {
          console.log("EDIT BUTTON CLICKED");
          onEdit();
        }}
      >
        Edit Student
      </button>
      <button
        className="delete-button"
        onClick={onDelete}
      >
        Delete Student
      </button>
    </div>
  );
}

export default StudentCard;

