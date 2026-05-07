import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =========================
// LẤY HTML
// =========================

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const registerBtn = document.getElementById("registerBtn");

const loginBtn = document.getElementById("loginBtn");

const result = document.getElementById("result");


// =========================
// ĐĂNG KÝ
// =========================

registerBtn.addEventListener("click", async () => {

    const email = emailInput.value;

    const password = passwordInput.value;

    if (email === "" || password === "") {

        result.innerText = "Vui lòng nhập đầy đủ";

        return;
    }

    try {

        // Tạo user Firebase
        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        // Lưu Firestore
        await setDoc(doc(db, "nguoi_dung", user.uid), {

            email: user.email,

            role: "user"

        });

        result.innerText = "Đăng ký thành công";

    } catch (error) {

        result.innerText = error.message;
    }

});


// =========================
// ĐĂNG NHẬP
// =========================

loginBtn.addEventListener("click", async () => {

    const email = emailInput.value;

    const password = passwordInput.value;

    if (email === "" || password === "") {

        result.innerText = "Vui lòng nhập đầy đủ";

        return;
    }

    try {

        // LOGIN FIREBASE
        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        // ĐỌC FIRESTORE
        const docRef = doc(
            db,
            "nguoi_dung",
            user.uid
        );

        const docSnap = await getDoc(docRef);

        // KIỂM TRA USER
        if (docSnap.exists()) {

            const data = docSnap.data();

            // ADMIN
            if (
                data.role === "admin" &&
                user.email === "vuthanhthuycb@gmail.com"
            ) {

                result.innerText = "Bạn là ADMIN";

            } else {

                result.innerText = "Bạn là USER";
            }

        } else {

            result.innerText = "Không có dữ liệu user";
        }

    } catch (error) {

        result.innerText = error.message;
    }

});
