import { useState } from 'react';
import StyledForm from "./styles/Form.styled";
import axios from 'axios';


var xlsx = require('xlsx');

const Form = () => {
	const [file, setFile] = useState(undefined);
	const [subjects, setSubjects] = useState([]);

	const uploadFile = (e) => {
		const data = new FormData();
		data.append('file', e.target.files[0]);
		axios.post("http://localhost:3001/spreadsheet", data)
			.then(res => {
				console.log(res.statusText)
			})
		setFile("../uploads/spreadsheet.xlsx");
	}

	const logFile = () => {
		axios.get("http://localhost:3001")
			.then((req, res) => {
				let data = [];
				const workbook = xlsx.read(req.data);
				const temp = xlsx.reader.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
				temp.forEach(result => {
					data.push(result);
				})
				console.log(data);
			})

	}

	return (
		<StyledForm encType="multipart/form-data">
			<fieldset>
				<legend>CREATE</legend>
				<div className="form-container" id="spreadsheet-container">
					<label htmlFor="spreadsheet">Select spreadsheet:</label>
					<input type="file" name="fileInput" id="spreadsheet" onChange={uploadFile} required />
					<button onClick={logFile}>Click</button>
				</div>

				<div className="form-container" id="schoolName-container">
					<label htmlFor="schoolName">Enter school name:</label>
					<input type="text" id="schoolName" required />
				</div>

				<div className="form-container" id="className-container">
					<label htmlFor="className">Enter class name:</label>
					<input type="text" id="className" required />
				</div>

				<div className="form-container">
					<h3>Subjects</h3>
					<div id="subjects-container">
						<div className="subject-container">
							<label htmlFor="english">English</label>
							<input type="checkbox" id="english" className="subject" required />
						</div>
						<div className="subject-container">
							<label htmlFor="maths">Maths</label>
							<input type="checkbox" id="maths" className="subject" required />
						</div>
						<div className="subject-container">
							<label htmlFor="social-studies">Social Studies</label>
							<input type="checkbox" id="social-studies" className="subject" required />
						</div>
						<div className="subject-container">
							<label htmlFor="hindi">Hindi</label>
							<input type="checkbox" id="hindi" className="subject" required />
						</div>
						<div className="subject-container">
							<label htmlFor="malayalam-i">Malayalam I</label>
							<input type="checkbox" id="malayalam-i" className="subject" required />
						</div>
						<div className="subject-container">
							<label htmlFor="malayalam-ii">Malayalam II</label>
							<input type="checkbox" id="malayalam-ii" className="subject" required />
						</div>
					</div>
				</div>
			</fieldset>
		</StyledForm >
	)
}

export default Form;
