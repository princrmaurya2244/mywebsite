const students = [
  "SUSHMA MAURYA",
  "KHUSHBU YADAV",
  "DIVYA PRAJAPATI",
  "ANJALI YADAV",
  "RAGINI CHAUHAN",
  "PRIYANSHI MAURYA",
  "ANUSHKA PRAJAPATI",
  "AANCHAL YADAV",
  "HIMANSHI YADAV",
  "POONAM YADAV",
  "KHUSHI RAJBHAR",
  "SONALI YADAV",
  "PREETI",
  "ANAMIKA CHAUDHARI",
  "AFRIDA PARVEEN",
  "MUSKAN GUPTA",
  "BANDANA CHAUHAN 1st",
  "NISHA GUPTA",
  "AMRITA YADAV",
  "KHUSHI YADAV",
  "TAMANNA CHAUHAN",
  "AKANKSHA GOND",
  "SIDDHIKA SINGH",
  "PRIYANJALI YADAV",
  "MAYA DHANGAR",
  "MANSHI",
  "NISHU MAURYA",
  "SHWETA CHAUHAN",
  "SHVETA CHAUHAN",
  "ANSHIKA YADAV",
  "PRIYA YADAV",
  "SHRISHTI",
  "SEJAL MADDESHIYA",
  "PRIYANKA MAURYA",
  "ANNU CHAUHAN",
  "HARSHITA",
  "TANYA PANDEY",
  "SUNAINA CHAUHAN",
  "SHIKHA YADAV",
  "GAYATRI YADAV",
  "NIDHI GUPTA",
  "ANJALI",
  "ASMITA YADAV",
  "NANDANI MAURYA",
  "AKANKSHA YADAV",
  "AARADHYA YADAV",
  "ANURADHA YADAV",
  "AALIYA PARBEEN",
  "ANSHIKA PRAJAPATI",
  "ARADHYA JAYSWAL",
  "SONALI KUMARI",
  "PRITI CHAUHAN",
  "KHUSHEE CHAUHAN",
  "SHWETA",
  "JAYA MAURYA",
  "ANUSHKA CHAUDHARI",
  "ANSHU YADAV",
  "PRIYANKA YADAV",
  "ANSHIKA YADAV",
  "SEJAL SHARMA",
  "SHWETA YADAV",
  "KHUSHI",
  "KUMARI AMRITA RAJBHAR",
  "SWEETY YADAV",
  "RAGINEE GOND",
  "PRITI KUMARI",
  "SAKSHI",
  "RADHA GUPTA",
  "SHIVANI CHAUHAN",
  "MUSKAN CHAUHAN",
  "SALONI",
  "HIMANSHI SHARMA",
  "AASHIKA YADAV",
  "NEHA CHAUHAN",
  "REETU YADAV",
  "KIRAN CHAUHAN",
  "ANJU YADAV",
  "ASTHA",
  "SWETA",
  "SNEHA GOND",
  "AFIJA KHATOON",
  "MAYA",
  "SNEHA GUPTA",
  "NEHA MAURYA",
  "KHUSHI SHARMA",
  "ADITI SINGH",
  "RANJANA YADAV",
  "RIYA THAKUR",
  "KHUSHBU RAJBHAR",
  "PAYAL PANDEY",
  "GOLDI YADAV",
  "SAKSHI PASWAN",
  "DIVYA",
  "BANDANA CHAUHAN 2nd"
];


const tableBody = document.querySelector("#attendanceTable tbody");
const attDate = document.getElementById("attDate");

// Default today
attDate.valueAsDate = new Date();

// Temporary storage for current session
let tempAttendance = {}; // { index: "P"/"A" }

// Load table function
function loadTable() {
  tableBody.innerHTML = "";
  const date = attDate.value;

  // Load saved attendance from localStorage for this date
  tempAttendance = {};
  students.forEach((_, index) => {
    const saved = localStorage.getItem(date + "_" + index);
    if (saved) tempAttendance[index] = saved;
  });

  students.forEach((name, index) => {
    const status = tempAttendance[index] || "";

    const row = document.createElement("tr");

    // Create cells manually to keep buttons functional
    const snCell = document.createElement("td");
    snCell.textContent = index + 1;

    const nameCell = document.createElement("td");
    nameCell.textContent = name;

    const statusCell = document.createElement("td");
    statusCell.className = "status-text";
    statusCell.textContent = status;

    const actionCell = document.createElement("td");

    // Present button
    const presentBtn = document.createElement("button");
    presentBtn.textContent = "P";
    presentBtn.className = "present-btn";
    if (status === "P") presentBtn.classList.add("active");
    presentBtn.addEventListener("click", () => mark(index, "P"));

    // Absent button
    const absentBtn = document.createElement("button");
    absentBtn.textContent = "A";
    absentBtn.className = "absent-btn";
    if (status === "A") absentBtn.classList.add("active");
    absentBtn.addEventListener("click", () => mark(index, "A"));

    actionCell.appendChild(presentBtn);
    actionCell.appendChild(absentBtn);

    row.appendChild(snCell);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

// Mark attendance in temp memory
function mark(index, value) {
  tempAttendance[index] = value;

  // Update only status cell and button colors
  const row = tableBody.rows[index];
  const statusCell = row.cells[2];
  statusCell.textContent = value;

  const buttons = row.cells[3].getElementsByTagName("button");
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
  if (value === "P") buttons[0].classList.add("active");
  if (value === "A") buttons[1].classList.add("active");
}

// Save attendance to localStorage
function saveAttendance() {
  const date = attDate.value;
  for (const index in tempAttendance) {
    localStorage.setItem(date + "_" + index, tempAttendance[index]);
  }
  alert("Attendance saved for " + date);
}

// Date change listener
attDate.addEventListener("change", loadTable);

// Initial table load
loadTable();

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function() {
    const query = this.value.toLowerCase();
    const filtered = students.filter(student => student.toLowerCase().includes(query));
    renderTable(filtered);
});

// Modified loadTable function to allow filtered array
function renderTable(list) {
    tableBody.innerHTML = "";
    const date = attDate.value;

    list.forEach((name, i) => {
        const index = students.indexOf(name); // original index
        const status = tempAttendance[index] || "";

        const row = document.createElement("tr");

        const snCell = document.createElement("td");
        snCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const statusCell = document.createElement("td");
        statusCell.className = "status-text";
        statusCell.textContent = status;

        const actionCell = document.createElement("td");

        const presentBtn = document.createElement("button");
        presentBtn.textContent = "P";
        presentBtn.className = "present-btn";
        if (status === "P") presentBtn.classList.add("active");
        presentBtn.addEventListener("click", () => mark(index, "P"));

        const absentBtn = document.createElement("button");
        absentBtn.textContent = "A";
        absentBtn.className = "absent-btn";
        if (status === "A") absentBtn.classList.add("active");
        absentBtn.addEventListener("click", () => mark(index, "A"));

        actionCell.appendChild(presentBtn);
        actionCell.appendChild(absentBtn);

        row.appendChild(snCell);
        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// Initial load
renderTable(students);

