# Login Authentication System

A simple and responsive login authentication system built using HTML, CSS, and JavaScript. The project provides user registration, secure password hashing, login validation, a protected dashboard, and logout functionality.

## Features

* User registration with username/email and password
* Password validation
* Minimum 8-character password requirement
* Password must contain at least 1 number
* Duplicate username/email detection
* Login authentication
* Invalid credential error handling
* SHA-256 password hashing
* Protected dashboard page
* Login session using localStorage
* Logout functionality
* Responsive design
* Basic form validation

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Browser localStorage
* Web Crypto API

## Project Structure

```text
login-authentication/
│
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── login.js
├── register.js
├── dashboard.js
└── README.md
```

## How It Works

### Registration

Users create an account by entering their username/email and password.

The system checks:

* Empty fields
* Password length
* Password number requirement
* Password confirmation
* Duplicate username/email

The password is converted into a SHA-256 hash before being stored in localStorage.

### Login

Users enter their registered username/email and password.

The entered password is hashed and compared with the stored hashed password. If the credentials are correct, a login session is created and the user is redirected to the dashboard.

### Protected Dashboard

The dashboard can only be accessed after successful login. If a user tries to access the dashboard without an active login session, they are redirected to the login page.

### Logout

The Logout button removes the active login session from localStorage and redirects the user back to the login page.

## How to Run

1. Download or clone the project.
2. Open the project folder in Visual Studio Code.
3. Open `index.html`.
4. Right-click and select **Open with Live Server**.
5. Register a new account.
6. Login using the registered credentials.
7. Access the protected dashboard.

## Security Note

This project is designed as a **client-side educational demonstration**. Although passwords are hashed using SHA-256 instead of being stored as plain text, localStorage-based authentication is not suitable for production applications.

A real-world authentication system should use a secure backend, HTTPS, server-side sessions or secure tokens, and a password-specific hashing algorithm such as bcrypt or Argon2.

## Project Objective

The objective of this project is to demonstrate the basic concepts of user registration, password validation, authentication, session management, protected pages, and logout functionality using front-end web technologies.

## Author

**Khathija Rafida**
