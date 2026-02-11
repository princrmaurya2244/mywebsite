function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var main = document.querySelector(".main");

  sidebar.classList.toggle("show");
  main.classList.toggle("shift");
}

function goToPage(page){
  window.location = page;
}

function loadTodayAttendance() {

  // ✅ SAME date format as attendance page
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateKey = `${yyyy}-${mm}-${dd}`;

  let present = 0;
  let absent = 0;

  // ✅ dynamic check (0–200 safe)
  for (let i = 0; i < 200; i++) {
    const status = localStorage.getItem(dateKey + "_" + i);

    if (status === "P") present++;
    if (status === "A") absent++;
  }

  document.getElementById("presentCount").innerText = present;
  document.getElementById("absentCount").innerText = absent;
}

window.onload = loadTodayAttendance;
