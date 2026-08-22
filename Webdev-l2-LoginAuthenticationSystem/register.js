const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username === "" || password === "" || confirmPassword === "") {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (password.length < 8 || !/\d/.test(password)) {
        errorMessage.textContent = "Password must contain at least 8 characters and 1 number.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(function(user) {
        return user.username.toLowerCase() === username.toLowerCase();
    });

    if (userExists) {
        errorMessage.textContent = "Username or email already exists.";
        return;
    }

    const hashedPassword = await hashPassword(password);

    users.push({
        username: username,
        password: hashedPassword
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "index.html";
});

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);

    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}