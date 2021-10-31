const MaxMarksList = ({ userSubjects }) => (
	<div className="form-container">
		<h3 className="title">Maximum marks</h3>
		<div id="max-marks-container">
			<div id="max-marks-subjects">
				{
					userSubjects.map(subject => (
						<div key={`label-${subject}`}>{subject}</div>
					))
				}
			</div>

			<div id="max-marks-dropdowns">
				{
					userSubjects.map(subject => (
						<div key={`dropdown-${subject}`} >
							<select name="max-mark" id={`max-marks-${subject.replace(" ", "-")}`} className="max-mark">
								<option>20</option>
								<option>25</option>
								<option>40</option>
								<option>80</option>
							</select>
						</div>
					))
				}
			</div>
		</div>
	</div>
);

export default MaxMarksList;