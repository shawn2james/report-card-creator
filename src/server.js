const express = require("express");
const cors = require("cors");
const multer = require("multer");
const zip = require("express-zip");
const execSync = require("child_process").execSync;

const app = express();
const PORT = 3001;
app.use(cors());

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "uploads/");
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
	res.sendFile("/home/shawn/personal/projects/report-card-creator/uploads/documents.zip");
});

app.post("/document", upload.single("document"), (req, res) => {
	res.end();
	const output = execSync("zip $HOME/personal/projects/report-card-creator/uploads/documents.zip $HOME/personal/projects/report-card-creator/uploads/*", { encoding: "utf-8" });
	console.log(output);
});

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
