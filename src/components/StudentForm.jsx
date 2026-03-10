import { useState, useEffect } from "react";

function StudentForm({ students, setStudents, editStudent, setEditStudent }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setEmail(editStudent.email);
      setAge(editStudent.age);
    }
  }, [editStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields validation
    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    // Strong email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Edit student
    if (editStudent) {

      const updatedStudents = students.map((s) =>
        s.id === editStudent.id ? { ...s, name, email, age } : s
      );

      setStudents(updatedStudents);
      setEditStudent(null);

    } else {

      // Add new student
      const newStudent = {
        id: Date.now(),
        name,
        email,
        age
      };

      setStudents([...students, newStudent]);
    }

    // Reset form
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <button type="submit">
        {editStudent ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
}

export default StudentForm;