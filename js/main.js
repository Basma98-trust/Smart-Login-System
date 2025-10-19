function addUser(e) {
  e.preventDefault();

  var name = document.getElementById("nameInput").value.trim();
  var email = document.getElementById("emailInput").value.trim();
  var password = document.getElementById("passwordInput").value.trim();
  var message = document.getElementById("signupMessage");

  if (!name || !email || !password) {
    message.textContent = "All Inputs Is Required";
    message.classList.remove("d-none");
    message.classList.add("text-danger");
    return;
  }

  var usersSign = JSON.parse(localStorage.getItem("users")) || [];

  var exists = usersSign.some((user) => user.email === email);
  if (exists) {
    message.textContent = "Email already registered";
    message.classList.remove("d-none");
    message.classList.add("text-danger");
    return;
  }

  usersSign.push({ name, email, password });

  localStorage.setItem("users", JSON.stringify(usersSign));

  message.textContent = "Success";
  message.classList.remove("d-none");
  message.classList.remove("text-danger");
  message.classList.add("text-success");

  setTimeout(() => {
    message.classList.add("d-none");
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
  }, 2000);
}

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

function loginUser(e) {
  e.preventDefault();

  var emailLogin = document.getElementById("loginEmail").value.trim();
  var passwordLogin = document.getElementById("loginPassword").value.trim();
  var messageLogin = document.getElementById("loginMessage");

  if (!emailLogin || !passwordLogin) {
    messageLogin.textContent = "All Inputs Is Required";
    messageLogin.classList.remove("d-none");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var user = users.find(
    (u) => u.email === emailLogin && u.password === passwordLogin
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "../pages/login.html";
  } else {
    messageLogin.textContent = "Incorrect email or password";
    messageLogin.classList.remove("d-none");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var welcomeMessage = document.getElementById("welcomeMessage");
  if (!welcomeMessage) return;

  var currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && currentUser.name) {
    welcomeMessage.textContent = `Welcome ${currentUser.name}`;
  } else {
    welcomeMessage.textContent = "Welcome Guest";
  }
});
