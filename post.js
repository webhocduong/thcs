import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const postsContainer = document.getElementById("postsContainer");

let currentUser = null;

// Kiểm tra đăng nhập
onAuthStateChanged(auth, (user) => {

    currentUser = user;

    loadPosts();

});

// Load bài viết
async function loadPosts() {

    postsContainer.innerHTML = "Đang tải bài viết...";

    const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    postsContainer.innerHTML = "";

    querySnapshot.forEach((docSnap) => {

        const post = docSnap.data();

        const postId = docSnap.id;

        const postDiv = document.createElement("div");

        postDiv.classList.add("post-card");

        postDiv.innerHTML = `

            <h2>${post.title}</h2>

            <p>${post.content}</p>

            ${
                post.imageUrl
                ? `<img src="${post.imageUrl}" class="post-image">`
                : ""
            }

            <small>
                Đăng bởi: ${post.userEmail}
            </small>

            <br><br>

            ${
                currentUser &&
                currentUser.uid === post.userId

                ?

                `<button class="delete-btn" data-id="${postId}">
                    Xóa bài
                </button>`

                :

                ""
            }

        `;

        postsContainer.appendChild(postDiv);

    });

    // Nút xóa
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            const postId = button.dataset.id;

            const confirmDelete = confirm(
                "Bạn có chắc muốn xóa bài viết?"
            );

            if (!confirmDelete) return;

            await deleteDoc(doc(db, "posts", postId));

            alert("Đã xóa bài viết!");

            loadPosts();

        });

    });

}
