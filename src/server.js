const express = require("express");
const cors = require("cors");
const multer = require("multer");
const zip = require("express-zip");

const app = express();
const PORT = 3001;
app.use(cors())


var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'uploads/');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

app.get('/', function (req, res) {
	conosle.log("asdf");
	res.zip([
		{ path: 'uploads/Abhijith Shaji.docx', name: 'Abhijith Shaji.docx' }
	]);
});

app.post('/document', upload.single("document"), (req, res) => {
	res.end();
})

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
})