// Login Page Variables
var loginEmail = document.getElementById("loginEmail");
var loginPass = document.getElementById("loginPass");
var loginBtn = document.getElementById("loginBtn");
// sign Page Variables
var signName = document.getElementById("signName");
var signEmail = document.getElementById("signEmail");
var signPass = document.getElementById("signPass");
var signBtn = document.getElementById("signBtn");

//Home Page Variables
var welcomeUserDiv = document.getElementById("welcomeUser");
var nameOfNav = document.getElementById("nameOfNav");

var allUsers = JSON.parse(localStorage.getItem("usersContainer")) || [];
console.log(allUsers);

//For Sign Up
function addUser() {
  if (signName.value == "" || signEmail.value == "" || signPass.value == "") {
    Swal.fire({
      icon: "warning",
      title: "All Fields Are Required",

      theme: "dark",
      iconColor: "orange",
      confirmButtonColor: "orange",
    });
  } else if (
    isValid(userRegex.nameRegex, signName) &&
    isValid(userRegex.emailRegex, signEmail) &&
    isValid(userRegex.passRegex, signPass)
  ) {
    if (allUsers.length > 0) {
      for (var i = 0; i < allUsers.length; i++) {
        if (signEmail.value.trim().toLowerCase() == allUsers[i].email) {
          Swal.fire({
            icon: "warning",
            title: "this Email is Already Exists",
            theme: "dark",
            iconColor: "orange",
            confirmButtonColor: "orange",
          });
          return;
        }
      }
    }
    applyAdding();
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Form",
      text: "Please Enter Valid Name , Email & Password ",
      theme: "dark",
      iconColor: "red",
      confirmButtonColor: "red",
    });
  }
}

function applyAdding() {
  // console.log(window.location.pathname);

  var user = {
    name: signName.value,
    email: signEmail.value.trim().toLowerCase(),
    pass: signPass.value,
  };
  allUsers.push(user);
  localStorage.setItem("usersContainer", JSON.stringify(allUsers));
  Swal.fire({
    icon: "success",
    title: "Acount was added successfully",
    theme: "dark",
    iconColor: "#7511a0",
    confirmButtonColor: "#7511a0",
  });

  console.log(allUsers);

  clearInputs();
}

//For Login
function checkIfUser() {
  if (loginEmail.value.trim() === "" || loginPass.value.trim() === "") {
    Swal.fire({
      icon: "warning",
      title: "All Fields Are Required",
      theme: "dark",
      iconColor: "orange",
      confirmButtonColor: "orange",
    });
    return;
  }
  var trueUser = false;
  var existsEmail = false;
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === loginEmail.value.trim().toLowerCase()) {
      existsEmail = true;
      if (allUsers[i].pass === loginPass.value) {
        trueUser = true;
        var userName = allUsers[i].name;
        localStorage.setItem("currentUser", userName);
        // console.log(userName);
        window.location.href = "home.html";
        // console.log(window.location.pathname); // عمل مشكلة مع ال live Demo
        clearInputs();
        return;
      }
    }
  }
  if (!existsEmail) {
    Swal.fire({
      icon: "warning",
      title: "This Email Doesn't Exist",
      text: "Please sign up first.",
      theme: "dark",
      iconColor: "orange",
      confirmButtonColor: "orange",
    });
  } else if (!trueUser) {
    Swal.fire({
      icon: "error",
      title: "Incorrect Email or Password ",

      theme: "dark",
      iconColor: "red",
      confirmButtonColor: "red",
    });
  }
}

//For Home
function writeWelcomeMessage() {
  var userName = localStorage.getItem("currentUser");
  userName = userName.split(" ", 1);
  welcomeUserDiv.innerHTML = `<h2 class="text-center">Welcome, ${userName}</h2>`;
  nameOfNav.textContent = `${userName} Login`;
}
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

//Clearing inputs
function clearSignInputs() {
  signName.value = null;
  signEmail.value = null;
  signPass.value = null;
  signName.classList.remove("is-valid", "is-invalid");
  signEmail.classList.remove("is-valid", "is-invalid");

  signPass.classList.remove("is-valid", "is-invalid");
}
function clearLoginInputs() {
  loginEmail.value = null;
  loginPass.value = null;
  loginEmail.classList.remove("is-valid", "is-invalid");
  loginPass.classList.remove("is-valid", "is-invalid");
}
//Super Clear Func
function clearInputs() {
  if (window.location.pathname.includes("index.html")) {
    clearLoginInputs();
  } else if (window.location.pathname.includes("sign.html")) {
    clearSignInputs();
  }
}

//Validation
var userRegex = {
  nameRegex: /^[A-Za-z][A-Za-z\s]{2,}$/,
  emailRegex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  passRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};
function isValid(regex, inputElement) {
  if (regex.test(inputElement.value)) {
    // console.log("valid");
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
    return true;
  } else {
    // console.log("Invalid");
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
    return false;
  }
}
