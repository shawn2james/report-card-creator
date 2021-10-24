import StyledFieldFiles from "./styles/FieldFiles.styled";

const FieldFiles = () => (
	<StyledFieldFiles>
		<legend>FILES</legend>
		<label for="spreadsheet">Select spreadsheet</label>
		<input type="file" id="spreadsheet" />
	</StyledFieldFiles >
)

export default FieldFiles;