import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StudentTable({ students, setStudents, setEditStudent, search }) {

  const deleteStudent = (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      const updatedStudents = students.filter((s) => s.id !== id);
      setStudents(updatedStudents);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "students.xlsx");
  };

  return (
    <div>

      <button className="download-btn" onClick={downloadExcel}>
        Download Excel
      </button>

      <table className="student-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredStudents.map((student) => (
            <tr key={student.id}>

              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => setEditStudent(student)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StudentTable;