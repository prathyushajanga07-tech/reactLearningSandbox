
import { useState } from "react";
import "./StudentCard.css";

function StudentCard({ name, course, cgpa }) {
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
    </div>
  );
}

export default StudentCard;
