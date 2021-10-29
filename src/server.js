const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors())

const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, 'uploads')
	},
	filename: (req, file, callBack) => {
		callBack(null, `spreadsheet.xlsx`)
	}
})

let upload = multer({ storage: storage })

app.get('/', function (req, res) {
	// res.sendFile("/home/shawn/projects/report-card-creator/uploads/spreadsheet.xlsx");
	res.sendFile(path.join(__dirname, '../uploads', 'spreadsheet.xlsx'));
});

app.post('/spreadsheet', upload.single('file'), (req, res, next) => {
	const file = req.file;
	if (!file) {
		const error = new Error('No File')
		error.httpStatusCode = 400
		return next(error)
	}
	res.send(file);
})

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
})