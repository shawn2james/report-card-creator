# Report Card Creator
A simple GUI made using Python that creates a report card for each student in an excel sheet (made it to help my mom) of a certain format given **the following info:**<br>
* Excel File<br>
* Directory to save the report card files<br>
* Class name<br>
* Subjects<br>
* Maximum marks for each subject<br>
* Do you want grades to be generated automatically in the report cards?<br>
* Do you want to convert the report card .docx files to PDFs?<br>

**Specifications for the Excel sheet:**<br>
* The row containing the column names (Full name, subjects...) should be the 2nd row. The 1st row can contain another heading like the class name or can be left empty.<br>
* The column containing the students' names should have a name of "Full name".<br>
* No two subjects should have the same first three letters.<br>
	

### GUI
<img src="gui-screenshot.png" style="width: 50%; height: 70%;">

### A sample Excel Sheet that would work with this program
<img src="excel-screenshot.png" style="width: 80%; height: 70%;">

## Tech Stack used:
* Python 
* PyQt5 module
* Pandas module
* docx module
* docx2pdf module
* Microsoft Excel
* Microsoft Word
* Google Sheets