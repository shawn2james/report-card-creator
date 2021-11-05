import { Paragraph, AlignmentType, TextRun, Table, TableRow, TableCell, WidthType } from "docx"

export const primaryTitle = text => new Paragraph({
	children: [
		new TextRun({
			text: text,
			bold: true,
			size: 60,
			font: "Ubuntu"
		})
	],
	alignment: AlignmentType.CENTER,
	spacing: {
		after: 500
	}
})

export const secondaryTitle = text => new Paragraph({
	children: [
		new TextRun({
			text: text,
			size: 55,
			font: "Ubuntu",
		})
	],
	alignment: AlignmentType.CENTER,
	spacing: {
		after: 500
	}
})

export const classNameTitle = text => new Paragraph({
	children: [
		new TextRun({
			text: text,
			size: 40,
			font: "Ubuntu"
		})
	],
	alignment: AlignmentType.CENTER,
	spacing: {
		after: 1000
	}
})

export const studentNamePara = text => new Paragraph({
	children: [
		new TextRun({
			text: text,
			font: "Ubuntu",
			size: 40
		})
	],
	spacing: {
		after: 650
	}
})

export const markTable = (subjects, marks, maxMarks) => {
	const firstRow = new TableRow({
		children: [
			new TableCell({
				children: [
					new Paragraph({
						children: [new TextRun({ text: "Subject", bold: true, size: 30, font: "Ubuntu" })],
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 200,
							after: 200,
						}
					})
				],
			}),
			new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({ text: "Marks", bold: true, size: 30, font: "Ubuntu" })],
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 200,
							after: 200,
						}
					})
				]
			}),
			new TableCell({
				children: [
					new Paragraph({
						children: [
							new TextRun({ text: "Maximum marks", bold: true, size: 30, font: "Ubuntu" })
						],
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 200,
							after: 200,
						}
					})
				]
			})
		]
	})

	const subjectRows = []
	subjects.forEach((subject, idx) => {
		const subjectRow = new TableRow({
			children: [
				new TableCell({
					children: [
						new Paragraph({
							children: [new TextRun({ text: subject, size: 30, font: "Ubuntu" })],
							alignment: AlignmentType.CENTER,
							spacing: {
								before: 200,
								after: 200,
							}
						})
					],
				}),
				new TableCell({
					children: [
						new Paragraph({
							children: [
								new TextRun({ text: marks[idx], size: 30, font: "Ubuntu" })],
							alignment: AlignmentType.CENTER,
							spacing: {
								before: 200,
								after: 200,
							}
						})
					]
				}),
				new TableCell({
					children: [
						new Paragraph({
							children: [
								new TextRun({ text: maxMarks[idx], size: 30, font: "Ubuntu" })
							],
							alignment: AlignmentType.CENTER,
							spacing: {
								before: 200,
								after: 200,
							}
						})
					]
				})
			]
		})

		subjectRows.push(subjectRow);
	})

	const table = new Table({
		rows: [firstRow].concat(subjectRows),
		width: {
			size: 9000,
			type: WidthType.DXA
		}
	})

	return table;
}
