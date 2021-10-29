import StyledStudents from "./styles/Students.styled";

const Students = ({ students, manageChange }) => (
	<StyledStudents className="form-container">
		<h3 className="title">Students</h3>
		<div id="students-container">
			{
				students.map(student => (
					<div key={student} className="student-container">
						<label htmlFor={student}>{student}</label>
						<input type="checkbox" id={student} className="student" onChange={manageChange} defaultChecked />
					</div>
				))
			}
		</div>
	</StyledStudents>
)

export default Students;