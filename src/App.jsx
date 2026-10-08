
import { useState } from "react";
import StudentCard from "./StudentCard";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Prathyusha", course: "CSE", cgpa: "9.7" },
    { id: 2, name: "Harshini", course: "MBBS", cgpa: "10" },
    { id: 3, name: "Tvisha", course: "CA", cgpa: "9.5" },
    { id: 4, name: "Arshi", course: "BBA", cgpa: "9.1" }
  ]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [cgpa, setCgpa] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !course.trim() || !cgpa.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      course: course.trim(),
      cgpa: cgpa.trim()
    };

    setStudents([...students, newStudent]);

    setName("");
    setCourse("");
    setCgpa("");
  }

  return (
    <div className="app">
      <h1>Student Dashboard 🎓</h1>

      <h2>Add a New Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        />

        <input
          type="number"
          placeholder="CGPA"
          value={cgpa}
          onChange={(event) => setCgpa(event.target.value)}
          min="0"
          max="10"
          step="0.1"
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Our Students ({students.length})</h2>

      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          course={student.course}
          cgpa={student.cgpa}
        />
      ))}
    </div>
  );
}

export default App;

