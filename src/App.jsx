
import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";

const initialStudents = [
  { id: 1, name: "Prathyusha", course: "CSE", cgpa: "9.7" },
  { id: 2, name: "Harshini", course: "MBBS", cgpa: "10" },
  { id: 3, name: "Tvisha", course: "CA", cgpa: "9.5" },
  { id: 4, name: "Arshi", course: "BBA", cgpa: "9.1" },
];

function loadStudents() {
  try {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : initialStudents;
  } catch {
    return initialStudents;
  }
}

function App() {
  const [status, setStatus] = useState("success");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(loadStudents);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [cgpa, setCgpa] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  function handleEdit(student) {
    setName(student.name);
    setCourse(student.course);
    setCgpa(student.cgpa);
    setEditingId(student.id);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !course.trim() || !cgpa.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const cgpaValue = Number(cgpa);

    if (
      !Number.isFinite(cgpaValue) ||
      cgpaValue < 0 ||
      cgpaValue > 10
    ) {
      alert("CGPA must be between 0 and 10!");
      return;
    }

    const studentData = {
      id: editingId !== null ? editingId : Date.now(),
      name: name.trim(),
      course: course.trim(),
      cgpa: cgpaValue.toString(),
    };

    if (editingId !== null) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId ? studentData : student
        )
      );
    } else {
      setStudents((prev) => [...prev, studentData]);
    }

    setName("");
    setCourse("");
    setCgpa("");
    setEditingId(null);
  }

  function handleCancelEdit() {
    setName("");
    setCourse("");
    setCgpa("");
    setEditingId(null);
  }

  function handleDelete(studentId) {
    setStudents((prev) =>
      prev.filter((student) => student.id !== studentId)
    );

    if (editingId === studentId) {
      handleCancelEdit();
    }
  }

  const query = search.toLowerCase().trim();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query)
  );

  return (
    <div className="app">
      <h1>Student Dashboard 🎓</h1>

      <h2>
        {editingId !== null ? "Edit Student" : "Add a New Student"}
      </h2>

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

        <button type="submit">
          {editingId !== null ? "Update Student" : "Add Student"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      <h2>Search Students 🔎</h2>

      <input
        type="text"
        placeholder="Search by name or course..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <h2>
        Our Students ({filteredStudents.length} of {students.length})
      </h2>

      {status === "loading" ? (
        <div className="empty-state">
          <p>⏳ Loading students...</p>
        </div>
      ) : status === "error" ? (
        <div className="empty-state">
          <p>⚠️ Couldn't load students.</p>
          <p>Please try again.</p>
          <button
            type="button"
            onClick={() => setStatus("success")}
          >
            Try again
          </button>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <p>🎓 No students yet!</p>
          <p>Add your first student using the form above.</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state">
          <p>🔎 No matching students found.</p>
          <p>Try another name or course.</p>
          <button
            type="button"
            onClick={() => setSearch("")}
          >
            Clear search
          </button>
        </div>
      ) : (
        filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            course={student.course}
            cgpa={student.cgpa}
            onEdit={() => handleEdit(student)}
            onDelete={() => handleDelete(student.id)}
          />
        ))
      )}
    </div>
  );
}

export default App;



