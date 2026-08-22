const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(user) {
        return user.username.toLowerCase() === username.toLowerCase();
    });

    if (!user) {
        errorMessage.textContent = "Invalid username/email or password.";
        return;
    }

    const hashedPassword = await hashPassword(password);

    if (hashedPassword !== user.password) {
        errorMessage.textContent = "Invalid username/email or password.";
        return;
    }

    localStorage.setItem("loggedInUser", user.username);

    window.location.href = "dashboard.html";
});

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);

    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}