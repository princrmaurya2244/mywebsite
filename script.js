function login(){
    const u = document.getElementById("user").value.trim();
    const p = document.getElementById("pass").value.trim();
    const card = document.querySelector(".login-card");

    if(u === "" || p === ""){
        alert("Please enter username and password!");
        return;
    }

    if(u === "admin" && p === "1234"){
        alert("Login Success");
        window.location.href = "dashboard.html"; // redirect to dashboard
    } else {
        alert("Wrong Username or Password!");
        card.classList.add("shake");
        setTimeout(() => card.classList.remove("shake"), 500);
    }
}

function forgotPassword(){
    alert("Please contact school admin to reset your password.");
}
