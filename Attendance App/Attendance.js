const students = [
    { slno: 1, name: "Piyush Kumar Agrawal" },
    { slno: 2, name: "Anwesha Bal" },
    { slno: 3, name: "Gourab Barik" },
    { slno: 4, name: "Aditya Biswabandhu" },
    { slno: 5, name: "Damodar Biswal" },
    { slno: 6, name: "Supriya Subhalaxmi Das" },
    { slno: 7, name: "Samridhi Das" },
    { slno: 8, name: "Pratik Ranjan Dash" },
    { slno: 9, name: "Ayusmita Das" },
    { slno: 10, name: "Suchna Ghosh" },
    { slno: 11, name: "Aditya Kumar Gupta" },
    { slno: 12, name: "Ansh Gupta" },
    { slno: 13, name: "Ayush Kumar Jha" },
    { slno: 14, name: "Nikhil Kumar Jha" },
    { slno: 15, name: "Ishita Jha" },
    { slno: 16, name: "Rahul Kumar Jha" },
    { slno: 17, name: "Jatin Kumar" },
    { slno: 18, name: "Kriti Minz" },
    { slno: 19, name: "Saswat Mishra" },
    { slno: 20, name: "Abhipsa Mohapatra" },
    { slno: 21, name: "Sayan Mondal" },
    { slno: 22, name: "Shubham Kumar Mahto" },
    { slno: 23, name: "Mili" },
    { slno: 24, name: "Somesh Nanda" },
    { slno: 25, name: "Amlan Anshuman Nayak" },
    { slno: 26, name: "Smruti Ranjan Nayak" },
    { slno: 27, name: "Kiran Nayak" },
    { slno: 28, name: "Satyajit Nayak" },
    { slno: 29, name: "Subham Nayak" },
    { slno: 30, name: "Guru Prasad Panda" },
    { slno: 31, name: "Debasmita Panda" },
    { slno: 32, name: "Siddharth Panda" },
    { slno: 33, name: "Sourav Panda" },
    { slno: 34, name: "Suvam Panda" },
    { slno: 35, name: "Baisakhi Rani Panigrahy" },
    { slno: 36, name: "Srushti Swaroop Parida" },
    { slno: 37, name: "Abhijeet Parida" },
    { slno: 38, name: "Smruti Parija" },
    { slno: 39, name: "Sourav Pati" },
    { slno: 40, name: "Hemanth Patnana" },
    { slno: 41, name: "Sai Prasad Patra" },
    { slno: 42, name: "Padman Pattanaik" },
    { slno: 43, name: "Ayush Raj" },
    { slno: 44, name: "Sahil Raj" },
    { slno: 45, name: "Rishabh Gupta" },
    { slno: 46, name: "Durgesh Kumar Rout" },
    { slno: 47, name: "Tushar Roy" },
    { slno: 48, name: "Atish Kumar Sahoo" },
    { slno: 49, name: "Rishit Kumar Sahoo" },
    { slno: 50, name: "Sajhush Kumar Sahoo" },
    { slno: 51, name: "Omm Prakash Sahoo" },
    { slno: 52, name: "Priyanka Priyadarshini Sahoo" },
    { slno: 53, name: "Sushree Sangeeta Sahoo" },
    { slno: 54, name: "Rajendra Aryan Sahu" },
    { slno: 55, name: "Ayush Kumar Sahu" },
    { slno: 56, name: "Satwik Sahu" },
    { slno: 57, name: "Subhashis Sahu" },
    { slno: 58, name: "Arpit Kumar Samal" },
    { slno: 59, name: "Anurag Senapati" },
    { slno: 60, name: "Arpit Kumar Nath Sharma" },
    { slno: 61, name: "Tushar Shaw" },
    { slno: 62, name: "Samprati Shivang" },
    { slno: 63, name: "Om Singh" },
    { slno: 64, name: "Sushri Shomya Swain" },
    { slno: 65, name: "Hitesh Swain" },
    { slno: 66, name: "Chinmaya Swain" },
];

window.onload = () => {
    const studentList = document.getElementById('studentList');
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.slno}. ${student.name}`;
        li.dataset.slno = student.slno; // Store serial number for later use
        li.addEventListener('click', () => {
            li.classList.toggle('present');
        });
        studentList.appendChild(li);
    });
};

function generateAttendance() {
    const presentStudents = document.querySelectorAll('.present');
    const attendanceList = document.querySelector('#attendanceTable tbody');
    const totalPresent = document.getElementById('totalPresent');
    const attendanceTable = document.getElementById('attendanceTable');

    attendanceList.innerHTML = '';
    let count = 0;

    presentStudents.forEach(student => {
        const studentName = student.textContent.split('. ')[1];
        const studentSlno = student.dataset.slno;

        // Create a row for each present student
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        cell1.textContent = studentSlno; // Use original serial number
        cell2.textContent = studentName;

        row.appendChild(cell1);
        row.appendChild(cell2);
        attendanceList.appendChild(row);
        count++;
    });

    totalPresent.textContent = count;
    attendanceTable.style.display = 'table'; // Show the table
}     
async function downloadAttendance() {
// Import jsPDF and autoTable
const { jsPDF } = window.jspdf;

// Create a new jsPDF instance
const doc = new jsPDF();

// Add title
doc.setFontSize(16);
doc.text("Class Attendance", 20, 20);

// Prepare table data
const rows = document.querySelectorAll('#attendanceTable tbody tr');
const tableData = Array.from(rows).map(row => {
    const cells = row.querySelectorAll('td');
    return [
        cells[0].textContent.trim(), // Serial Number
        cells[1].textContent.trim(), // Name
    ];
});

// Add table using autoTable
doc.autoTable({
    head: [['Sl. No.', 'Name']],
    body: tableData,
    startY: 30,
});

// Save the PDF
doc.save("Attendance.pdf");
}