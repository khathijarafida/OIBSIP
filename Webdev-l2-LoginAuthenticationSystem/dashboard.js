const loggedInUser = localStorage.getItem("loggedInUser");

if (!loggedInUser) {
    window.location.href = "index.html";
}

const welcomeMessage = document.getElementById("welcomeMessage");
const logoutButton = document.getElementById("logoutButton");

welcomeMessage.textContent = "Welcome, " + loggedInUser + "!";

logoutButton.addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
});