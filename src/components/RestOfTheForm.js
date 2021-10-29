import React from "react";
import Subjects from "./Subjects";
import Students from "./Students";

class RestOfTheForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userStudents: props.students,
			userSubjects: props.subjects,
		}
	}

	editSubjects = (e) => {
		const checkedElements = Array.from(document.querySelectorAll(".subject")).filter(subjectCheckbox => subjectCheckbox.checked === true);
		const checkedSubjects = checkedElements.map(ele => ele.id);
		this.setState({ userSubjects: checkedSubjects });
	}

	editStudents = (e) => {
		const checkedElements = Array.from(document.querySelectorAll(".student")).filter(studentCheckbox => studentCheckbox.checked === true);
		const checkedStudents = checkedElements.map(ele => ele.id);
		this.setState({ userStudents: checkedStudents });
	}

	getMarks = (e) => {
		let userMarks = [];

		// get marks of selected students only
		this.props.students.forEach((student, idx) => {
			if (this.state.userStudents.includes(student)) {
				userMarks.push(this.props.marks[idx]);
			}
		})

		console.log(userMarks);

		// get marks of selected subjects only
		userMarks = userMarks.map(markRow => {
			const newMarkRow = [];
			this.props.subjects.forEach((subject, idx) => {
				if (this.state.userSubjects.includes(subject)) {
					newMarkRow.push(markRow[idx]);
				}
			})

			return newMarkRow;
		})

		console.log(userMarks);
	}

	render = () => (
		<div>
			<Students students={this.props.students} manageChange={this.editStudents} />
			<Subjects subjects={this.props.subjects} userSubjects={this.state.userSubjects} manageChange={this.editSubjects} />

			<input type="submit" id="submit-btn" value="Confirm" onClick={this.getMarks} />
		</div>
	)
}

export default RestOfTheForm;