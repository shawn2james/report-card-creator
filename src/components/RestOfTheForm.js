import React from "react";
import Subjects from "./Subjects";
import Students from "./Students";
import { Document, Packer } from "docx";
import { primaryTitle, secondaryTitle, classNameTitle, studentNamePara, markTable } from "../docComponents";
import axios from 'axios';

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

	getMarks = () => {
		let userMarks = [];

		// get marks of selected students only
		this.props.students.forEach((student, idx) => {
			if (this.state.userStudents.includes(student)) {
				userMarks.push(this.props.marks[idx]);
			}
		})

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

		return userMarks;
	}

	getMaxMarks = () => {
		let maxMarks = [];

		this.state.userSubjects.forEach(subject => {
			const ele = document.querySelector(`#max-marks-${subject.replace(" ", "-")}`);
			maxMarks.push(ele.value);
		})

		return maxMarks;
	}

	createDocument = (e) => {
		e.preventDefault();
		const documents = [];

		const schoolName = document.querySelector("#school-name").value;
		const secondaryHeading = document.querySelector("#secondary-heading").value;
		const className = document.querySelector("#class-name").value;
		const marks = this.getMarks();
		const maxMarks = this.getMaxMarks();

		const headingDoc = primaryTitle(schoolName);
		const secondaryHeadingDoc = secondaryTitle(secondaryHeading);
		const classNameDoc = classNameTitle(className);

		this.state.userStudents.forEach((student, idx) => {
			const studentNameDoc = studentNamePara(`Name of the student: ${student}`);
			const tableDoc = markTable(this.state.userSubjects, marks[idx], maxMarks);

			const doc = new Document({
				sections: [{
					children: [
						headingDoc,
						secondaryHeadingDoc,
						classNameDoc,
						studentNameDoc,
						tableDoc
					]
				}]
			})

			documents.push(doc);
		})

		documents.forEach((doc, idx) => {
			Packer.toBlob(doc).then(blob => {
				let fd = new FormData();
				fd.append('document', blob, `${this.state.userStudents[idx]}.docx`);
				axios.post("http://localhost:3001/document", fd);
			})
		})
	}

	downloadDocuments = () => {
		axios.get("http://localhost:3001").then((req, res) => {
			console.log(res);
		})
	}

	render = () => (
		<div>
			<Students students={this.props.students} manageChange={this.editStudents} />
			<Subjects subjects={this.props.subjects} userSubjects={this.state.userSubjects} manageChange={this.editSubjects} />


			<input type="submit" id="submit-btn" value="Confirm" onClick={this.createDocument} />
			<button id="download-btn" onClick={this.downloadDocuments}>Download</button>
		</div>
	)
}

export default RestOfTheForm;