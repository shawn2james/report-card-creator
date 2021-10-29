import styled from "styled-components";

const StyledForm = styled.form`
	fieldset {
		padding: 0 80px 30px 80px;
		border-radius: 20px;

		legend {
			padding: 20px;
		}

		.form-container {
			margin: 35px 0;
		}

		#schoolName, #className, #spreadsheet {
			font-size: 17px;
			margin: 30px; 
			padding: 5px 10px;
			border-radius: 5px;
		}

		#schoolName, #className {
			border: 1px solid black;
		}

		input[type="checkbox"] {
			margin: 15px;
		}

		#submit-btn {
			margin-top: 30px;
			font-size: 20px;
			padding: 10px 18px;
			border: 1px solid black;
			border-radius: 5px;

			&:hover {
				transform: scale(1.1);
				transition: transform 0.2s ease-in-out;
				background-color: lightblue;
			}
		}
	}
`;

export default StyledForm;