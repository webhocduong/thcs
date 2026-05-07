import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =========================
// LẤY ELEMENT TỪ HTML
// =========================

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const btnRegister = document.getElementById("registerBtn");
const btnLogin = document.getElementById("loginBtn");

const message = document.getElementById("result");


// =========================
// ĐĂNG KÝ
// =========================

btnRegister.addEventListener("click", async () => {

    const email = emailInput.value;
    const password = passwordInput.value;

    // kiểm tra rỗng
    if (email === "" || password === "") {
        message.innerText = "Vui lòng nhập email và mật khẩu";
        return;
    }

    try {

        // tạo tài khoản Firebase
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        message.innerText = "Đăng ký thành công";

    } catch (error) {

        message.innerText = error.message;
    }

});


// =========================
// ĐĂNG NHẬP
// =========================

btnLogin.addEventListener("click", async () => {

    const email = emailInput.value;
    const password = passwordInput.value;

    // kiểm tra rỗng
    if (email === "" || password === "") {
        message.innerText = "Vui lòng nhập email và mật khẩu";
        return;
    }

    try {

        // đăng nhập Firebase
        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        // đọc dữ liệu Firestore
        const docRef = doc(
            db,
            "nguoi_dung",
            user.uid
        );

        const docSnap = await getDoc(docRef);

        // nếu có dữ liệu
        if (docSnap.exists()) {

            const data = docSnap.data();

            // kiểm tra admin
            if (
                data.role === "admin" &&
                user.email === "vuthanhthuycb@gmail.com"
            ) {

                message.innerText = "Bạn là ADMIN";

                // chuyển trang admin
                window.location.href = "admin.html";

            } else {

                message.innerText = "Bạn là USER";

                // chuyển trang user
                window.location.href = "post.html";
            }

        } else {

            message.innerText = "Không có dữ liệu user";
        }

    } catch (error) {

        message.innerText = error.message;
    }

});
