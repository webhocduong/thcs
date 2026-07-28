import { auth, db } from './firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { renderShell, postCard, emptyState, adminEmail } from './ui.js';

let currentUser=null;
onAuthStateChanged(auth, async(user)=>{ if(!user){ alert('Bạn phải đăng nhập'); location.href='index.html'; return; } currentUser=user; renderShell('write', user); renderEditor(); await loadPosts(); });
function renderEditor(){ document.getElementById('mainContent').innerHTML = `<section class="page-head"><span class="eyebrow">Sáng tạo nội dung</span><h1>Viết bài mới</h1><p>Chia sẻ kiến thức, hoạt động và kinh nghiệm học tập của bạn.</p></section><form class="postContainer" id="postForm"><input type="text" id="title" placeholder="Tiêu đề"><select id="category"><option>Học tập</option><option>Toán</option><option>Ngữ văn</option><option>Tiếng Anh</option><option>Tin học</option></select><textarea id="content" placeholder="Nội dung"></textarea><input type="file" id="imageInput" accept="image/*"><button id="postBtn" type="submit">Đăng bài</button></form><h2 class="center">Bài viết học sinh</h2><div id="postsContainer" class="post-grid"></div>`; document.getElementById('postForm').onsubmit=submitPost; }
async function loadPosts(){
  const box=document.getElementById('postsContainer'); box.innerHTML='<div class="skeleton"></div><div class="skeleton"></div>';
  try{ const snap=await getDocs(collection(db,'posts')); const posts=snap.docs.map(d=>({id:d.id,...d.data()})); box.innerHTML=posts.length?posts.map(p=>postCard(p)+((currentUser.uid===p.userId||currentUser.email===adminEmail)?`<button class="deleteBtn" data-id="${p.id}">Xóa bài</button>`:'')).join(''):emptyState('Chưa có bài viết'); document.querySelectorAll('.deleteBtn').forEach(btn=>btn.onclick=async()=>{ await deleteDoc(doc(db,'posts',btn.dataset.id)); loadPosts(); }); }catch(e){ box.innerHTML=emptyState('Không tải được dữ liệu Firestore'); console.warn(e); }
}
async function submitPost(e){
  e.preventDefault(); const title=document.getElementById('title'), content=document.getElementById('content'), imageInput=document.getElementById('imageInput'), category=document.getElementById('category');
  if(!title.value.trim() || !content.value.trim()){ alert('Nhập tiêu đề và nội dung'); return; }
  let imageUrl='';
  if(imageInput.files?.length){ const formData=new FormData(); formData.append('file', imageInput.files[0]); formData.append('upload_preset','school_upload'); const res=await fetch('https://api.cloudinary.com/v1_1/dfoo4jpkz/image/upload',{method:'POST',body:formData}); const data=await res.json(); imageUrl=data.secure_url || ''; }
  await addDoc(collection(db,'posts'), { title:title.value, content:content.value, category:category.value, imageUrl, userEmail:currentUser.email, userId:currentUser.uid, createdAt:serverTimestamp() });
  alert('Đăng bài thành công'); e.target.reset(); loadPosts();
}
