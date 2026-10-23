
import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";

const API_URL = "http://localhost:5000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [formError, setFormError] = useState("");

  async function fetchStudents() {
    try {
      setStatus("loading");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching students:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  function resetForm() {
    setName("");
    setCourse("");
    setCgpa("");
    setEditingId(null);
    setFormError("");
  }

  function handleEdit(student) {
    setName(student.name);
    setCourse(student.course);
    setCgpa(String(student.cgpa));
    setEditingId(student.id);
    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (!name.trim() || !course.trim() || !cgpa.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    const cgpaValue = Number(cgpa);

    if (
      !Number.isFinite(cgpaValue) ||
      cgpaValue < 0 ||
      cgpaValue > 10
    ) {
      setFormError("CGPA must be between 0 and 10.");
      return;
    }

    const studentData = {
      name: name.trim(),
      course: course.trim(),
      cgpa: cgpaValue,
    };

    try {
      const isEditing = editingId !== null;
      const url = isEditing
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? "Failed to update student."
              : "Failed to add student.")
        );
      }

      await fetchStudents();
      resetForm();
    } catch (error) {
      console.error("Error saving student:", error);
      setFormError(
        error.message ||
          "Couldn't save the student. Please try again."
      );
    }
  }

  async function handleDelete(studentId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          data.message || "Failed to delete student."
        );
      }

      if (editingId === studentId) {
        resetForm();
      }

      await fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert(
        error.message ||
          "Couldn't delete the student. Please try again."
      );
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
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      {formError && (
        <p role="alert" className="form-error">
          ⚠️ {formError}
        </p>
      )}

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
          <p>Check that your backend is running.</p>
          <button type="button" onClick={fetchStudents}>
            Try Again
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
          <button type="button" onClick={() => setSearch("")}>
            Clear Search
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





