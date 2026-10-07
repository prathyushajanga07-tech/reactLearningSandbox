import StudentCard from "./StudentCard";

function App() {
  const students = [
    { name: "Prathyusha", course: "CSE", cgpa: "9.7" },
    { name: "Harshini", course: "MBBS", cgpa: "10" },
    { name: "Tvisha", course: "CA", cgpa: "9.5" },
    { name: "Arshi", course: "BBA", cgpa: "9.1" },
    { name: "Teja", course: "CSE", cgpa: "9.3" }
  ];

  return (
    <div>
      <h1>My Students</h1>

      {students.map((student) => (
        <StudentCard
          key={student.name}
          name={student.name}
          course={student.course}
          cgpa={student.cgpa}
        />
      ))}
    </div>
  );
}

export default App;
