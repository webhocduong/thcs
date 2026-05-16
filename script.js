// script.js

import { auth } from "./firebase.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    onAuthStateChanged,

    signOut

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ======================
// INPUT
// ======================

const email =
document.getElementById("email");

const password =
document.getElementById("password");


// ======================
// BUTTON
// ======================

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");


// ======================
// AREA
// ======================

const authArea =
document.getElementById("authArea");

const userArea =
document.getElementById("userArea");


// ======================
// REGISTER
// ======================

if(registerBtn){

    registerBtn.onclick = async ()=>{

        if(email.value.trim() === ""){

            alert("Nhập email");

            return;
        }

        if(password.value.trim() === ""){

            alert("Nhập mật khẩu");

            return;
        }

        try{

            await createUserWithEmailAndPassword(

                auth,

                email.value,

                password.value
            );

            alert("Đăng ký thành công");

        }catch(error){

            alert(error.message);

            console.log(error);
        }
    };
}


// ======================
// LOGIN
// ======================

if(loginBtn){

    loginBtn.onclick = async ()=>{

        if(email.value.trim() === ""){

            alert("Nhập email");

            return;
        }

        if(password.value.trim() === ""){

            alert("Nhập mật khẩu");

            return;
        }

        try{

            await signInWithEmailAndPassword(

                auth,

                email.value,

                password.value
            );

            alert("Đăng nhập thành công");

        }catch(error){

            alert(error.message);

            console.log(error);
        }
    };
}


// ======================
// CHECK LOGIN
// ======================

onAuthStateChanged(auth, (user)=>{

    if(user){

        // ẨN LOGIN REGISTER

        if(authArea){

            authArea.style.display =
            "none";
        }


        // HIỆN USER

        if(userArea){

            userArea.innerHTML = `

                <div class="userMenu">

                    <div id="userBox">

                        <img
                            src="https://i.imgur.com/HeIi0wU.png"
                            class="avatar"
                        >

                        <span>
                            ${user.email}
                        </span>

                    </div>

                    <div class="dropdownMenu">

                        <button id="profileBtn">
                            Hồ sơ
                        </button>

                        <button id="myPostsBtn">
                            Bài đã đăng
                        </button>

                        <button id="logoutBtn">
                            Đăng xuất
                        </button>

                    </div>

                </div>

            `;
        }


        // ======================
        // PROFILE
        // ======================

        const profileBtn =
        document.getElementById("profileBtn");

        if(profileBtn){

            profileBtn.onclick = ()=>{

                alert(
                    "Tài khoản:\n\n" +
                    user.email
                );
            };
        }


        // ======================
        // POSTS
        // ======================

        const myPostsBtn =
        document.getElementById("myPostsBtn");

        if(myPostsBtn){

            myPostsBtn.onclick = ()=>{

                window.location.href =
                "post.html";
            };
        }


        // ======================
        // LOGOUT
        // ======================

        const logoutBtn =
        document.getElementById("logoutBtn");

        if(logoutBtn){

            logoutBtn.onclick = async ()=>{

                await signOut(auth);

                location.reload();
            };
        }

    }else{

        // HIỆN LOGIN REGISTER

        if(authArea){

            authArea.style.display =
            "flex";
        }


        // XÓA USER MENU

        if(userArea){

            userArea.innerHTML = "";
        }
    }
});
