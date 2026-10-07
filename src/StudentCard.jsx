import "./StudentCard.css";

function StudentCard({ name, course, cgpa }) {
  return (
    <div className="student-card">
      <h2>{name}</h2>
      <p>Course: {course}</p>
      <p>CGPA: {cgpa}</p>
    </div>
  );
}

export default StudentCard;