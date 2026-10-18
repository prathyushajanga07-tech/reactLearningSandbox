
const express = require("express");

const app = express();
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
    const newStudent = {
        id: Date.now(),
        name: req.body.name,
        course: req.body.course,
        cgpa: req.body.cgpa
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

    student.name = req.body.name ?? student.name;
    student.course = req.body.course ?? student.course;
    student.cgpa = req.body.cgpa ?? student.cgpa;

    res.json(student);
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
