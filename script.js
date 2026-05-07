import {
  auth
}
from "./firebase.js";

import {

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  signOut,

  onAuthStateChanged

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* INPUT */

const emailInput =
document.getElementById("email");

const passwordInput =
document.getElementById("password");

/* BUTTON */

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const userBtn =
document.getElementById("userBtn");

/* SECTIONS */

const authSection =
document.getElementById("authSection");

const userSection =
document.getElementById("userSection");

const userEmail =
document.getElementById("userEmail");

const dropdownMenu =
document.getElementById("dropdownMenu");

const result =
document.getElementById("result");

/* ĐĂNG KÝ */

registerBtn.addEventListener(
"click",
async()=>{

  try{

    await
    createUserWithEmailAndPassword(

      auth,

      emailInput.value,

      passwordInput.value

    );

    result.innerText =
    "Đăng ký thành công";

  }

  catch(error){

    result.innerText =
    error.message;
  }

});

/* LOGIN */

loginBtn.addEventListener(
"click",
async()=>{

  try{

    await
    signInWithEmailAndPassword(

      auth,

      emailInput.value,

      passwordInput.value

    );

    result.innerText =
    "Đăng nhập thành công";

  }

  catch(error){

    result.innerText =
    error.message;
  }

});

/* LOGOUT */

logoutBtn.addEventListener(
"click",
async()=>{

  await signOut(auth);

});

/* CHECK LOGIN */

onAuthStateChanged(
auth,
(user)=>{

  if(user){

    authSection.style.display =
    "none";

    userSection.style.display =
    "block";

    userEmail.innerText =
    user.email;

  }

  else{

    authSection.style.display =
    "flex";

    userSection.style.display =
    "none";
  }

});

/* MENU */

userBtn.addEventListener(
"click",
()=>{

  if(
    dropdownMenu.style.display
    ===
    "block"
  ){

    dropdownMenu.style.display =
    "none";

  }

  else{

    dropdownMenu.style.display =
    "block";
  }

});
