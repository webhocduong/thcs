import { auth } from "./firebase.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    onAuthStateChanged,

    signOut

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email =
document.getElementById("email");

const password =
document.getElementById("password");

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");

const guestButtons =
document.getElementById("guestButtons");

const userMenu =
document.getElementById("userMenu");

const userEmail =
document.getElementById("userEmail");

const logoutBtn =
document.getElementById("logoutBtn");


// ĐĂNG KÝ

registerBtn.onclick = async () => {

    try{

        await createUserWithEmailAndPassword(

            auth,

            email.value,

            password.value

        );

        alert("Đăng ký thành công");

    }catch(error){

        alert(error.message);
    }
};


// ĐĂNG NHẬP

loginBtn.onclick = async () => {

    try{

        await signInWithEmailAndPassword(

            auth,

            email.value,

            password.value

        );

        alert("Đăng nhập thành công");

    }catch(error){

        alert(error.message);
    }
};


// KIỂM TRA LOGIN

onAuthStateChanged(auth, (user)=>{

    if(user){

        guestButtons.style.display = "none";

        userMenu.style.display = "flex";

        userEmail.innerText = user.email;

    }else{

        guestButtons.style.display = "flex";

        userMenu.style.display = "none";
    }
});


// ĐĂNG XUẤT

logoutBtn.onclick = async ()=>{

    await signOut(auth);

    location.reload();
};
