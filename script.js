// FIREBASE

import { auth } from "./firebase.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    onAuthStateChanged,

    signOut

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// INPUT

const email =
document.getElementById("email");

const password =
document.getElementById("password");


// BUTTON

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");


// USER AREA

const userArea =
document.getElementById("userArea");

const authArea =
document.getElementById("authArea");


// ======================
// ĐĂNG KÝ
// ======================

registerBtn.addEventListener(
    "click",
    async () => {

        if(email.value === ""){

            alert("Nhập email");

            return;
        }

        if(password.value === ""){

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
        }
    }
);


// ======================
// ĐĂNG NHẬP
// ======================

loginBtn.addEventListener(
    "click",
    async () => {

        if(email.value === ""){

            alert("Nhập email");

            return;
        }

        if(password.value === ""){

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
        }
    }
);


// ======================
// CHECK LOGIN
// ======================

onAuthStateChanged(
    auth,
    (user)=>{

        if(user){

            authArea.style.display = "none";


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


            // PROFILE

            document
            .getElementById("profileBtn")
            .addEventListener(
                "click",
                ()=>{

                    alert(
                        "Email: " +
                        user.email
                    );
                }
            );


            // MY POSTS

            document
            .getElementById("myPostsBtn")
            .addEventListener(
                "click",
                ()=>{

                    window.location.href =
                    "post.html";
                }
            );


            // LOGOUT

            document
            .getElementById("logoutBtn")
            .addEventListener(
                "click",
                async ()=>{

                    await signOut(auth);

                    location.reload();
                }
            );

        }else{

            authArea.style.display = "flex";

            userArea.innerHTML = "";
        }
    }
);
   
