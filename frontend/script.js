// Utility functions 
// Source: Codecademy.com (no date) Async javascript and HTTP requests: Learn javascript: Requests 
// cheatsheet, Codecademy. Available at: 
//https://www.codecademy.com/learn/fscp-async-javascript-and-http-requests/modules/fecp-learn-javascript-requests/cheatsheet
// (Accessed: 29 November 2024). 
async function sendRequest(url, method, body) {
  const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
  });
  return response.json();
}

function showMessage(message, isSuccess = true, duration = 3000) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = message;
  messageDiv.className = isSuccess ? "success" : "error";
  messageDiv.style.display = "block";

  // Hide the message after the specified duration
  setTimeout(() => {
      messageDiv.style.display = "none";
  }, duration);
}

// Global Variables
let solution = null; // Stores the correct solution
let timerStart = null; // Tracks the timer start time
let username = ""; // Tracks the logged-in user
let timerInterval = null; // Timer interval for the live timer

// Login User
async function login(event) {
  event.preventDefault();
  const loginUsername = document.getElementById("login-username").value;
  const loginPassword = document.getElementById("login-password").value;

  const result = await sendRequest("http://localhost:5000/api/login", "POST", {
      username: loginUsername,
      password: loginPassword,
  });

  if (result.success) {
      username = loginUsername;
      showMessage(`Welcome to The Banana Game, ${username}!`, true, 3000);
      setTimeout(() => {
          toggleForms("game");
          fetchQuest();
          displayWelcomeText();
      }, 1500);
  } else {
      showMessage(result.message || "Login failed. Please try again.", false);
  }
}

// Register User
// Source: W3schools.com (no date) W3Schools Online Web Tutorials. 
//Available at: https://www.w3schools.com/js/js_async.asp (Accessed: 29 November 2024).
async function register(event) {
  event.preventDefault();
  const registerUsername = document.getElementById("register-username").value;
  const registerPassword = document.getElementById("register-password").value;

  const result = await sendRequest("http://localhost:5000/api/register", "POST", {
      username: registerUsername,
      password: registerPassword,
  });

  if (result.success) {
      showMessage(result.message || "Registration successful!", true, 3000);
      setTimeout(() => {
          toggleForms("login");
      }, 1500);
  } else {
      showMessage(result.message || "Registration failed. Please try again.", false);
  }
}

// Fetch Quest from Lecturer's API
const apiUrl = "https://marcconrad.com/uob/banana/api.php";
async function fetchQuest() {
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update the game with a new quest
      document.getElementById("quest").src = data.question;
      solution = data.solution;
      showMessage("New quest loaded. Select your answer.", true, 5000);
      startTimer();
  } catch (error) {
      console.error("Failed to fetch quest:", error);
      showMessage("Failed to fetch quest. Please try again.", false);
  }
}

// Display Welcome Text
function displayWelcomeText() {
  const welcomeText = document.getElementById("welcome-text");
  welcomeText.innerText = `Welcome to The Banana Game, ${username}!`;
  welcomeText.style.display = "block";
}

// Start Timer
// Source: Sharma, S. (2024) Javascript timer function: Javascript explained, Bito. 
//Available at: https://bito.ai/resources/javascript-timer-function-javascript-explained/ (Accessed: 29 November 2024). 
function startTimer() {
  timerStart = Date.now(); // Record the start time
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = "Time: 0s";

  // Clear existing intervals
  if (timerInterval) clearInterval(timerInterval);

  // Update the timer every second
  timerInterval = setInterval(() => {
      const timeElapsed = Math.floor((Date.now() - timerStart) / 1000);
      timerDisplay.innerText = `Time: ${timeElapsed}s`;
  }, 1000);
}

// Validate Answer Automatically
// Source: W3Schools (no date) W3schools.com, JavaScript Form Validation. 
//Available at: https://www.w3schools.com/js/js_validation.asp (Accessed: 29 November 2024).
function autoValidateInput(event) {
  const answer = parseInt(event.target.value);

  if (answer === solution) {
      const timeTaken = Math.round((Date.now() - timerStart) / 1000); // Calculate time in seconds
      showMessage(`Correct! You took ${timeTaken} seconds. Fetching a new quest...`, true, 7000);
      clearInterval(timerInterval); // Stop the timer
      setTimeout(fetchQuest, 3000);
  } else {
      showMessage("Not correct. Try again!", false, 5000);
  }
}

// Logout User
function logout() {
  username = ""; // Clear the username
  toggleForms("login");

  // Clear input fields
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";

  showMessage("You have successfully logged out.");
}

// Form Toggling
function toggleForms(section) {
  document.getElementById("login").style.display = section === "login" ? "block" : "none";
  document.getElementById("register").style.display = section === "register" ? "block" : "none";
  document.getElementById("game").style.display = section === "game" ? "block" : "none";

  if (section !== "game") {
      const welcomeText = document.getElementById("welcome-text");
      welcomeText.style.display = "none";
  }
}

// Event Listeners
// Source: W3schools.com (no date) JavaScript DOM EventListener. 
//Available at: https://www.w3schools.com/js/js_htmldom_eventlistener.asp (Accessed: 29 November 2024).
document.getElementById("login-form").addEventListener("submit", login);
document.getElementById("register-form").addEventListener("submit", register);
document.getElementById("answer").addEventListener("input", autoValidateInput);