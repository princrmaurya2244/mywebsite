function uploadPDF(){
  var course = document.getElementById("courseName").value;
  var fileInput = document.getElementById("pdfFile");
  var msg = document.getElementById("msg");

  if(course === ""){
    alert("Select course");
    return;
  }

  if(fileInput.files.length === 0){
    alert("Select PDF file");
    return;
  }

  var file = fileInput.files[0];

  if(file.type !== "application/pdf"){
    alert("Only PDF allowed");
    return;
  }

  msg.innerText = "PDF uploaded for " + course + ": " + file.name;
}
