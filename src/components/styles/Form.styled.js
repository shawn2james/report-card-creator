import styled from "styled-components";

const StyledForm = styled.form`
	fieldset {
		padding: 0 80px 30px 80px;
		border-radius: 20px;
	}
	legend {
		padding: 20px;
	}

	.form-container {
		margin: 20px 0;
	}

	input[type="text"], input[type="file"] {
		font-size: 17px;
		margin: 30px; 
		padding: 5px 10px;
		border-radius: 5px;
		border: none;
	}

	input[type="checkbox"] {
		margin: 15px;
	}

	#subjects-container {
		display: grid;
		margin-top: 20px;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px;
	}
`;

export default StyledForm;