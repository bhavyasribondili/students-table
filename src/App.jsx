import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setStudents([
        { id: 1, name: "John Doe", email: "john@gmail.com", age: 20 },
        { id: 2, name: "Jane Smith", email: "jane@gmail.com", age: 22 }
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <h2 className="loading">Loading students...</h2>;
  }

  return (
    <div className="container">

      <h1>Students Management</h1>

      <StudentForm
        students={students}
        setStudents={setStudents}
        editStudent={editStudent}
        setEditStudent={setEditStudent}
      />

      <input
        className="search"
        type="text"
        placeholder="Search student by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <StudentTable
        students={students}
        setStudents={setStudents}
        setEditStudent={setEditStudent}
        search={search}
      />

    </div>
  );
}

export default App;