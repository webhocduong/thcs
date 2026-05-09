import {
    auth,
    db
} from "./firebase.js";

import {

    collection,

    addDoc,

    getDocs,

    deleteDoc,

    doc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const title =
document.getElementById("title");

const content =
document.getElementById("content");

const imageInput =
document.getElementById("imageInput");

const postBtn =
document.getElementById("postBtn");

const postsContainer =
document.getElementById("postsContainer");

let currentUser = null;


/* LOGIN */

onAuthStateChanged(auth, async (user)=>{

    if(user){

        currentUser = user;

        loadPosts();

    }else{

        alert("Bạn phải đăng nhập");

        window.location.href = "index.html";
    }
});


/* LOAD POSTS */

async function loadPosts(){

    const querySnapshot =
    await getDocs(collection(db, "posts"));

    postsContainer.innerHTML = "";


    querySnapshot.forEach((docSnap)=>{

        const post =
        docSnap.data();

        const div =
        document.createElement("div");

        div.className = "postCard";


        div.innerHTML = `

            ${
                post.imageUrl

                ?

                `<img
                    src="${post.imageUrl}"
                    class="postImage"
                >`

                :

                ""
            }

            <h2>
                ${post.title}
            </h2>

            <p>
                ${post.content}
            </p>

            <small>
                Đăng bởi:
                ${post.userEmail}
            </small>

            <br><br>

            ${
                currentUser &&
                currentUser.uid === post.userId

                ?

                `<button
                    class="deleteBtn"
                    data-id="${docSnap.id}">
                    Xóa bài
                </button>`

                :

                ""
            }

        `;

        postsContainer.appendChild(div);
    });


    /* DELETE */

    document
    .querySelectorAll(".deleteBtn")

    .forEach((btn)=>{

        btn.onclick = async ()=>{

            await deleteDoc(

                doc(
                    db,
                    "posts",
                    btn.dataset.id
                )
            );

            loadPosts();
        };
    });
}


/* POST */

postBtn.onclick = async ()=>{

    if(title.value.trim() === ""){

        alert("Nhập tiêu đề");

        return;
    }

    if(content.value.trim() === ""){

        alert("Nhập nội dung");

        return;
    }

    try{

        let imageUrl = "";


        /* IMAGE */

        if(imageInput.files.length > 0){

            const file =
            imageInput.files[0];

            const formData =
            new FormData();

            formData.append("file", file);

            formData.append(
                "upload_preset",
                "school_upload"
            );


            const response =
            await fetch(

                "https://api.cloudinary.com/v1_1/dfoo4jpkz/image/upload",

                {
                    method:"POST",
                    body:formData
                }
            );

            const data =
            await response.json();

            imageUrl =
            data.secure_url;
        }


        /* SAVE */

        await addDoc(

            collection(db, "posts"),

            {

                title:title.value,

                content:content.value,

                imageUrl:imageUrl,

                userEmail:currentUser.email,

                userId:currentUser.uid,

                createdAt:serverTimestamp()

            }
        );


        title.value = "";

        content.value = "";

        imageInput.value = "";


        alert("Đăng bài thành công");

        loadPosts();

    }catch(error){

        alert(error.message);
    }
};
