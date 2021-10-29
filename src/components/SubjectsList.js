const SubjectsList = ({ subjects, manageChange }) => (
	<div className="form-container" id="subjects-container">
		<h3 className="title">Subjects</h3>
		<div id="subjects">
			{
				subjects.map(subject => (
					<div key={subject} className="subject-container">
						<label htmlFor={subject}>{subject}</label>
						<input type="checkbox" id={subject} onChange={manageChange} className="subject" defaultChecked />
					</div>
				))
			}
		</div>
	</div>
);

export default SubjectsList;