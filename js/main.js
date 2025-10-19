

// ---------- Helper: show message ----------
function showMessage(elementId, text, colorClass = "text-danger") {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.classList.remove("text-danger", "text-success", "d-none");
  el.classList.add(colorClass);
}


// ---------- Signup ----------
function addUserHandler(e) {
  e && e.preventDefault();
  const name = document.getElementById("nameInput")?.value.trim() || "";
  const email = document.getElementById("emailInput")?.value.trim() || "";
  const password = document.getElementById("passwordInput")?.value.trim() || "";

  if (!name || !email || !password) {
    showMessage("signupMessage", "All inputs are required!", "text-danger");
    return;
  }

  if (!/^[A-Za-z ]{3,}$/.test(name)) {
    showMessage("signupMessage", "Name must be at least 3 letters.", "text-danger");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage("signupMessage", "Invalid email format!", "text-danger");
    return;
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    showMessage("signupMessage", "Password must be 6+ chars and contain letters & numbers.", "text-danger");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.email === email)) {
    showMessage("signupMessage", "Email already registered!", "text-danger");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("signupMessage", "Account created successfully!", "text-success");

  setTimeout(() => {
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
    document.getElementById("signupMessage")?.classList.add("d-none");

    window.location.href = "../index.html";
  }, 1500);
}

// ---------- Login ----------
function loginUserHandler(e) {
  e && e.preventDefault();
  const email = document.getElementById("loginEmail")?.value.trim() || "";
  const password = document.getElementById("loginPassword")?.value.trim() || "";

  if (!email || !password) {
    showMessage("loginMessage", "All inputs are required!", "text-danger");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userByEmail = users.find(u => u.email === email);

  if (!userByEmail) {
    // الإيميل مش موجود
    showMessage("loginMessage", "Email not found!", "text-danger");
    return;
  }

  if (userByEmail.password !== password) {
    // الإيميل موجود لكن الباسورد غلط
    showMessage("loginMessage", "Incorrect password!", "text-danger");
    return;
  }

  // بيانات صحيحة
  localStorage.setItem("currentUser", JSON.stringify(userByEmail));
  window.location.href = "./pages/home.html";
}


// ---------- Home (welcome + logout) ----------
function initHomePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const welcomeEl = document.getElementById("welcomeMessage");

  if (!currentUser) {
    window.location.href = "../index.html";
    return;
  }

  if (welcomeEl) {
    welcomeEl.textContent = `Welcome, ${currentUser.name} `;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }
}


function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}


// ---------- Init ----------
document.addEventListener("DOMContentLoaded", function () {
  // Signup page
  const signUpBtn = document.getElementById("signUpBtn");
  if (signUpBtn) signUpBtn.addEventListener("click", addUserHandler);

  // Login page
  const signInBtn = document.getElementById("signInBtn");
  if (signInBtn) signInBtn.addEventListener("click", loginUserHandler);

  // Home page
  if (document.getElementById("welcomeMessage")) {
    initHomePage();
  }
});





// function addUser(e) {
//   e.preventDefault();

//   var name = document.getElementById("nameInput").value.trim();
//   var email = document.getElementById("emailInput").value.trim();
//   var password = document.getElementById("passwordInput").value.trim();
//   var message = document.getElementById("signupMessage");

//   // Reset message style each time
//   message.className = "text-center m-3";

//   // Basic Validation
//   if (!name || !email || !password) {
//     showMessage("All Inputs Is Required", "text-danger");
//     return;
//   }

//   // Name validation (letters only, at least 3 chars)
//   if (!/^[A-Za-z ]{3,}$/.test(name)) {
//     showMessage("Name must be at least 3 letters.", "text-danger");
//     return;
//   }

//   // Email validation
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     showMessage("Invalid email format!", "text-danger");
//     return;
//   }

//   // Password validation (min 6 chars, at least 1 letter and 1 number)
//   if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
//     showMessage(
//       "Password must be at least 6 characters and contain letters & numbers.",
//       "text-danger"
//     );
//     return;
//   }

//   // Check if user already exists
//   var usersSign = JSON.parse(localStorage.getItem("users")) || [];
//   var exists = usersSign.some((user) => user.email === email);
//   if (exists) {
//     showMessage("Email already registered!", "text-danger");
//     return;
//   }

//   //  Add user
//   usersSign.push({ name, email, password });
//   localStorage.setItem("users", JSON.stringify(usersSign));
//   showMessage("Account created successfully!", "text-success");

//   //  Clear fields and redirect to login page after 2s
//   setTimeout(() => {
//     document.getElementById("nameInput").value = "";
//     document.getElementById("emailInput").value = "";
//     document.getElementById("passwordInput").value = "";
//     message.classList.add("d-none");
    
//     // Redirect to login page
//     window.location.href = "../index.html";
//   }, 2000);

//   // Helper function for showing messages
//   function showMessage(text, colorClass) {
//     var msg = document.getElementById("signupMessage");
//     msg.textContent = text;
//     msg.classList.remove("d-none");
//     msg.classList.add(colorClass);
//   }
// }

// function loginUser(e) {
//   e.preventDefault();

//   var emailLogin = document.getElementById("loginEmail").value.trim();
//   var passwordLogin = document.getElementById("loginPassword").value.trim();
//   var messageLogin = document.getElementById("loginMessage");

//   if (!emailLogin || !passwordLogin) {
//     messageLogin.textContent = "All Inputs Is Required";
//     messageLogin.classList.remove("d-none");
//     return;
//   }

//   // جلب جميع المستخدمين
//   var users = JSON.parse(localStorage.getItem("users")) || [];

//   // البحث عن المستخدم
//   var user = users.find(
//     (u) => u.email === emailLogin && u.password === passwordLogin
//   );

//   if (user) {
//     // بيانات صحيحة → الانتقال لصفحة أخرى
//     window.location.href = "../pages/login.html"; // غيري حسب الصفحة المطلوبة
//   } else {
//     messageLogin.textContent = "Incorrect email or password";
//     messageLogin.classList.remove("d-none");
//   }
// }

//

// function loginUser(e) {
//   e.preventDefault();

//   var emailLogin = document.getElementById("loginEmail").value.trim();
//   var passwordLogin = document.getElementById("loginPassword").value.trim();
//   var messageLogin = document.getElementById("loginMessage");

//   if (!emailLogin || !passwordLogin) {
//     messageLogin.textContent = "All Inputs Is Required";
//     messageLogin.classList.remove("d-none");
//     return;
//   }

//   var users = JSON.parse(localStorage.getItem("users")) || [];

//   var user = users.find(
//     (u) => u.email === emailLogin && u.password === passwordLogin
//   );

//   if (user) {
//     localStorage.setItem("currentUser", JSON.stringify(user));

//     window.location.href = "../pages/home.html";
//   } else {
//     messageLogin.textContent = "Incorrect email or password";
//     messageLogin.classList.remove("d-none");
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   var welcomeMessage = document.getElementById("welcomeMessage");
//   if (!welcomeMessage) return;

//   var currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   if (currentUser && currentUser.name) {
//     welcomeMessage.textContent = `Welcome ${currentUser.name}`;
//   } else {
//     welcomeMessage.textContent = "Welcome Guest";
//   }
// });
