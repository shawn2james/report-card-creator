import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		font-family: "Poppins", Arial;
	}

	.container {
		margin: 80px;
	}

	form {
		font-size: 20px;
		margin: 0 70px;
	}

	.title {
		padding: 20px 0;
	}
`

export default GlobalStyles;