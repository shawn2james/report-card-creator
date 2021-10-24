const exceljs = require("exceljs");
const docx = require("docx");
const fs = require("fs");


const button = document.getElementsByTagName("button");
button.addEventListener("click", readSheet)

function readSheet() {
	const workbook = new exceljs.Workbook();

	workbook.xlsx.readFile("marksheet.xlsx")
		.then(book => {
			const sheet = book.getWorksheet(1);
			console.log(sheet.getRow(1).values);
		})
}

// const doc = new docx.Document({
// 	sections: [
// 		{
// 			properties: {},
// 			children: [
// 				new docx.Paragraph({
// 					children: [
// 						new docx.TextRun("Hello World"),
// 						new docx.TextRun({
// 							text: "Foo Bar",
// 							bold: true
// 						}),
// 						new docx.TextRun({
// 							text: "\tGithub is the best",
// 							bold: true
// 						})
// 					]
// 				})
// 			]
// 		}
// 	]
// })

// docx.Packer.toBuffer(doc).then(buffer => {
// 	fs.writeFileSync("test.docx", buffer);
// })