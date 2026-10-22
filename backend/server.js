const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
let students = [
    { id: 1, name: "Prathyusha", course: "CSE", cgpa: 9.7 },
    { id: 2, name: "Harshini", course: "MBBS", cgpa: 10 }
];
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.get("/students", (req, res) => {
    res.json(students);
});


app.post("/students", (req, res) => {
    const { name, course, cgpa } = req.body;
    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof course !== "string" ||
        course.trim() === "" ||
        typeof cgpa !== "number" ||
        !Number.isFinite(cgpa) ||
        cgpa < 0 ||
        cgpa > 10
    ) {
        return res.status(400).json({
            message: "Invalid student data"
        });
    }
    const newStudent = {
        id: Date.now(),
        name: name.trim(),
        course: course.trim(),
        cgpa
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
    const studentId = Number(req.params.id);

    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Prepare the proposed values.
    // Missing fields keep their existing values.
    const updatedName = req.body.name ?? student.name;
    const updatedCourse = req.body.course ?? student.course;
    const updatedCgpa = req.body.cgpa ?? student.cgpa;

    // Validate before modifying the student.
    if (
        typeof updatedName !== "string" ||
        updatedName.trim() === "" ||
        typeof updatedCourse !== "string" ||
        updatedCourse.trim() === "" ||
        typeof updatedCgpa !== "number" ||
        !Number.isFinite(updatedCgpa) ||
        updatedCgpa < 0 ||
        updatedCgpa > 10
    ) {
        return res.status(400).json({
            message: "Invalid student data"
        });
    }

    // Update only after validation passes.
    student.name = updatedName.trim();
    student.course = updatedCourse.trim();
    student.cgpa = updatedCgpa;

    return res.json(student);
});

app.delete("/students/:id", (req, res) => {
    const studentId = Number(req.params.id);

    const index = students.findIndex((s) => s.id === studentId);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
