import React from 'react';
import StyledForm from "./styles/Form.styled";
import readXlsxFile from 'read-excel-file';
import RestOfTheForm from './RestOfTheForm';

class Form extends React.Component {
	constructor() {
		super();

		this.state = {
			uploadText: null,
			file: null,
			students: [],
			subjects: [],
			userSubjects: [],
			marks: []
		}
	}

	uploadFile = (e) => {
		this.setState({ uploadText: <span>Uploading...</span> }, () => {
			console.log("reading file...")
			readXlsxFile(e.target.files[0])
				.then(data => {
					const firstValues = data.map(row => row[0]);
					const newStudents = firstValues.slice(1);

					const newMarks = data.map(row => row.slice(1)).slice(1);

					this.setState({
						file: data,
						students: newStudents,
						subjects: data[0].slice(1),
						userSubjects: data[0].slice(1),
						marks: newMarks
					}, () => {
						this.setState({ uploadText: null })
					})
				})
		})
	}

	render() {
		let restOfTheForm = null;

		if (this.state.file) {
			restOfTheForm = (
				<>
					<div className="form-container" id="school-name-container">
						<label htmlFor="schoolName">Enter school name:</label>
						<input type="text" id="schoolName" required />
					</div>

					<div className="form-container" id="class-name-container">
						<label htmlFor="className">Enter class name:</label>
						<input type="text" id="className" required />
					</div>

					<RestOfTheForm students={this.state.students} subjects={this.state.subjects} marks={this.state.marks} />
				</>
			);
		} else {
			restOfTheForm = null;
		}

		return (
			<StyledForm encType="multipart/form-data" >
				<fieldset>
					<legend>CREATE</legend>
					<div className="form-container" id="spreadsheet-container">
						<label htmlFor="spreadsheet">Select spreadsheet:</label>
						<input type="file" name="fileInput" id="spreadsheet" onChange={this.uploadFile} required />
						{this.state.uploadText}
					</div>

					{restOfTheForm}
				</fieldset>
			</StyledForm >
		)
	}
}

export default Form;