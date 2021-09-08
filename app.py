import sys
from PyQt5 import QtCore, QtGui
from PyQt5.QtWidgets import QMainWindow, QFileDialog, QApplication, QLabel, QPushButton, QWidget, QVBoxLayout, QComboBox, QHBoxLayout, QCheckBox, QTextEdit, QFormLayout
from utils import *

class Window(QMainWindow):
    def __init__(self):
        super().__init__()
        self.resize(500, 600)
        self.setWindowIcon(QtGui.QIcon("icon.png"))
        self.setWindowTitle("Report Card Creator")

        self.formLayout = QFormLayout()
        self.central = QWidget()
        self.formLayout.setContentsMargins(30, 10, 30, 10)
        self.central.setLayout(self.formLayout)
        self.setCentralWidget(self.central)

        self.UI()
    
    def UI(self):
        self.activateWindow()

        self.excel_path, self.save_dir, self.subjects = None, None, []

        # ASKING FOR FILES
        btnLayout = QHBoxLayout()
        btnWidget = QWidget()
        btnWidget.setLayout(btnLayout)

        self.excelBtn = QPushButton("Open Excel sheet", self)
        self.excelBtn.clicked.connect(self.get_excel_path)
        self.excelBtn.setStyleSheet("padding: 5px;")
        self.saveDirBtn = QPushButton("Select destination folder", self)
        self.saveDirBtn.clicked.connect(self.get_save_dir)
        self.saveDirBtn.setStyleSheet("padding: 5px;")
        btnLayout.addWidget(self.excelBtn)
        btnLayout.addWidget(self.saveDirBtn)
        btnLayout.addStretch()

        hiddenInput = QTextEdit()
        hiddenInput.setHidden(True)
        self.formLayout.addRow(btnWidget, hiddenInput)

        # CLASS NAME
        askClass = QLabel("Enter class name & divison:\n(Format -> Roman_numeral-divison) ", self)
        self.classInput = QTextEdit()
        self.classInput.setFixedSize(QtCore.QSize(60, 30))
        self.classInput.textChanged.connect(self.validate)
        self.formLayout.addRow(askClass, self.classInput)

        # SUBJECTS
        askSubjects = QLabel("Enter subjects to be shown in the report card:\n(Press Enter after each subject) ", self)
        self.subjectsInput = QTextEdit()
        self.subjectsInput.setFixedSize(QtCore.QSize(100, 50))
        self.subjectsInput.textChanged.connect(self.subject_changed)
        self.formLayout.addRow(askSubjects, self.subjectsInput)

        # GRADES
        askGrades = QLabel("Do you want Grades in your report cards: ", self)
        self.gradeCheck = QCheckBox()
        self.formLayout.addRow(askGrades, self.gradeCheck)

        # PDF
        askPdf = QLabel("Create PDF Copies: ", self)
        self.pdfCheck = QCheckBox()
        self.formLayout.addRow(askPdf, self.pdfCheck)

        # SUBMIT 
        self.submitBtn = QPushButton("Submit")
        self.submitBtn.setEnabled(False)
        self.submitBtn.clicked.connect(self.submit_action)
        self.formLayout.addRow(self.submitBtn, hiddenInput.copy())

    def subject_changed(self):
        content = self.subjectsInput.toPlainText()
        if "\n" in content:
            self.subjectsInput.clear()
            subject = content.strip("\n").title()
            if(subject not in self.subjects):
                self.subjects.append(subject)

                max_marks_label = QLabel(f"Enter maximum marks for {subject}: ", self) 
                max_marks_option = QComboBox(self, objectName=f"{subject}Marks")
                max_marks_option.addItem("20")
                max_marks_option.addItem("25")
                max_marks_option.addItem("40")
                max_marks_option.addItem("80")
                row = 3 + self.subjects.index(subject)
                self.formLayout.insertRow(row, max_marks_label, max_marks_option)
                print(self.subjects)
                self.validate()

    def get_excel_path(self):
        self.excel_path = QFileDialog.getOpenFileName(self, 'Open a file', '', 'All Files (*.*)')[0]
        excel_name = self.excel_path.split("/")[-1]
        self.sender().setText(f"Selected {excel_name}")
        self.validate()

    def get_save_dir(self):
        self.save_dir = str(QFileDialog.getExistingDirectory(self, "Select Directory"))
        save_dir_name = self.save_dir.split("/")[-1]
        self.sender().setText(f"Selected {save_dir_name}")
        self.validate()

    def submit_action(self):
        self.close()
        subject_details = []
        for subject in self.subjects:
            maxMark = self.findChild(QComboBox, f"{subject}Marks").currentText()
            subject_details.append([subject, "  ", int(maxMark), " "])
        
        showGrades = self.gradeCheck.isChecked()
        createPdf = self.pdfCheck.isChecked()
        class_name = self.classInput.toPlainText()

        save_files(showGrades, createPdf, self.excel_path, self.save_dir, class_name,
                    self.subjects, subject_details)

    def validate(self):
        isFilled = True if self.excel_path!=None and self.save_dir!=None and self.classInput.toPlainText() and self.subjects!=[] else False
        self.submitBtn.setEnabled(isFilled)

if __name__ == "__main__":
    app = QApplication(sys.argv)
  
    window = Window()
    window.show()
    sys.exit(app.exec_())   