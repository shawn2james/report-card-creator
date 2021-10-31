import React from "react";
import Subjects from "./Subjects";
import Students from "./Students";
import {
	Document, Packer, Paragraph,
	AlignmentType, TextRun, Table, TableRow, TableCell
} from "docx";
import { saveAs } from "file-saver";

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

	createDocument = () => {
		const schoolName = document.querySelector("#school-name").value;
		const secondaryHeading = document.querySelector("#secondary-heading").value;
		const className = document.querySelector("#class-name").value;
		// const marks = this.getMarks();
		// const maxMarks = this.getMaxMarks();

		console.log(schoolName, secondaryHeading, className);

		const schoolNameDoc = new Paragraph({
			children: [
				new TextRun({
					text: schoolName,
					bold: true,
					size: 60,
					font: "Ubuntu"
				})
			],
			alignment: AlignmentType.CENTER,
			spacing: {
				after: 500
			}
		})

		const secondaryHeadingDoc = new Paragraph({
			children: [
				new TextRun({
					text: secondaryHeading,
					size: 55,
					font: "Ubuntu",
				})
			],
			alignment: AlignmentType.CENTER,
			spacing: {
				after: 500
			}
		})

		const classNameDoc = new Paragraph({
			children: [
				new TextRun({
					text: className,
					size: 40,
					font: "Ubuntu"
				})
			],
			alignment: AlignmentType.CENTER,
			spacing: {
				after: 800
			}
		})

		const studentNameDoc = new Paragraph({
			children: [
				new TextRun({
					text: `Name of the student: Shawn James`,
					size: 35,
					font: "Ubuntu"
				})
			]
		})

		// const tableDoc = new Table({
		// 	rows: [
		// 		new TableRow({
		// 			children: [
		// 				new TableCell({
		// 					children: [
		// 						new Paragraph({
		// 							text: "Subject",
		// 							bold: true,
		// 							alignment: AlignmentType.CENTER,
		// 							size: 30,
		// 						})
		// 					]
		// 				}),
		// 				new TableCell({
		// 					children: [
		// 						new Paragraph({
		// 							text: "Subject",
		// 							bold: true,
		// 							alignment: AlignmentType.CENTER,
		// 							size: 30,
		// 						})
		// 					]
		// 				}),
		// 				new TableCell({
		// 					children: [
		// 						new Paragraph({
		// 							text: "Subject",
		// 							bold: true,
		// 							alignment: AlignmentType.CENTER,
		// 							size: 30,
		// 						})
		// 					]
		// 				}),
		// 			]
		// 		})
		// 	]
		// })

		const table = new Table({
			rows: [
				new TableRow({
					children: [
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
					],
				}),
				new TableRow({
					children: [
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
							rowSpan: 2,
						}),
					],
				}),
				new TableRow({
					children: [
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [new Paragraph("Hello")],
						}),
						new TableCell({
							children: [],
						}),
					],
				}),
				new TableRow({
					children: [
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
						new TableCell({
							children: [],
						}),
					],
				}),
			],
		});
		const doc = new Document({
			sections: [{
				children: [
					schoolNameDoc,
					secondaryHeadingDoc,
					classNameDoc,
					studentNameDoc,
					table
				]
			}]
		})

		Packer.toBlob(doc).then(blob => {
			console.log("lkjsdflkjasdf;");
			saveAs(blob, "test.docx");
		})
	}

	render = () => (
		<div>
			<Students students={this.props.students} manageChange={this.editStudents} />
			<Subjects subjects={this.props.subjects} userSubjects={this.state.userSubjects} manageChange={this.editSubjects} />

			<input type="submit" id="submit-btn" value="Confirm" onClick={this.createDocument} />
		</div>
	)
}

export default RestOfTheForm;