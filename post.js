import { auth, db } from './firebase.js';
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, serverTimestamp, updateDoc, increment } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { renderShell, postCard, postActionButtons, emptyState, adminEmail, avatarUrl, bindPostInteractions } from './ui.js';

let currentUser=null;
const detailId = new URLSearchParams(location.search).get('id');
onAuthStateChanged(auth, async(user)=>{ currentUser=user; renderShell(detailId ? 'feed' : 'write', user); if(detailId) await renderPostDetail(detailId, user); else{ if(!user){ alert('Bạn phải đăng nhập'); location.href='index.html'; return; } renderEditor(); await loadPosts(); } });

async function renderPostDetail(id, user){
  const main = document.getElementById('mainContent');
  main.innerHTML = '<div class="skeleton"></div>';
  try{
    const ref = doc(db, 'posts', id);
    const snap = await getDoc(ref);
    if(!snap.exists()){ main.innerHTML = emptyState('Không tìm thấy bài viết'); return; }
    const post = { id: snap.id, ...snap.data() };
    await updateDoc(ref, { views: increment(1) });
    post.views = (post.views || 0) + 1;
    const date = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('vi-VN') : 'Mới đăng';
    const img = post.imageUrl || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80';
    main.innerHTML = `<article class="detail-card"><img class="detail-thumb" src="${img}" alt="${post.title||'Bài viết'}"><div class="detail-body"><span class="badge">${post.category||'Học tập'}</span><h1>${post.title||'Bài viết mới'}</h1><div class="post-meta"><img src="${avatarUrl}" alt=""><span>${post.author||post.userEmail||'Tác giả'}</span><span>${date}</span><span>👁 ${post.views||0}</span></div><p class="detail-content">${post.content||'Nội dung đang được cập nhật.'}</p><div class="post-actions detail-actions">${postActionButtons(post, user)}<span>💬 ${post.comments||0}</span></div><a class="read-more" href="news.html">← Quay lại Feed</a></div></article>`;
    bindPostInteractions(user);
  }catch(e){ console.warn(e); main.innerHTML = emptyState('Không tải được bài viết'); }
}

function renderEditor(){ document.getElementById('mainContent').innerHTML = `<section class="page-head"><span class="eyebrow">Sáng tạo nội dung</span><h1>Viết bài mới</h1><p>Chia sẻ kiến thức, hoạt động và kinh nghiệm học tập của bạn.</p></section><form class="postContainer" id="postForm"><input type="text" id="title" placeholder="Tiêu đề"><select id="category"><option>Học tập</option><option>Toán</option><option>Ngữ văn</option><option>Tiếng Anh</option><option>Tin học</option></select><textarea id="content" placeholder="Nội dung"></textarea><input type="file" id="imageInput" accept="image/*"><button id="postBtn" type="submit">Đăng bài</button></form><h2 class="center">Bài viết học sinh</h2><div id="postsContainer" class="post-grid"></div>`; document.getElementById('postForm').onsubmit=submitPost; }
async function loadPosts(){
  const box=document.getElementById('postsContainer'); box.innerHTML='<div class="skeleton"></div><div class="skeleton"></div>';
  try{ const snap=await getDocs(collection(db,'posts')); const posts=snap.docs.map(d=>({id:d.id,...d.data()})); box.innerHTML=posts.length?posts.map(p=>postCard(p,currentUser)+((currentUser.uid===p.userId||currentUser.email===adminEmail)?`<button class="deleteBtn" data-id="${p.id}">Xóa bài</button>`:'')).join(''):emptyState('Chưa có bài viết'); bindPostInteractions(currentUser); document.querySelectorAll('.deleteBtn').forEach(btn=>btn.onclick=async()=>{ await deleteDoc(doc(db,'posts',btn.dataset.id)); loadPosts(); }); }catch(e){ box.innerHTML=emptyState('Không tải được dữ liệu Firestore'); console.warn(e); }
}
async function submitPost(e){
  e.preventDefault(); const title=document.getElementById('title'), content=document.getElementById('content'), imageInput=document.getElementById('imageInput'), category=document.getElementById('category');
  if(!title.value.trim() || !content.value.trim()){ alert('Nhập tiêu đề và nội dung'); return; }
  let imageUrl='';
  if(imageInput.files?.length){ const formData=new FormData(); formData.append('file', imageInput.files[0]); formData.append('upload_preset','school_upload'); const res=await fetch('https://api.cloudinary.com/v1_1/dfoo4jpkz/image/upload',{method:'POST',body:formData}); const data=await res.json(); imageUrl=data.secure_url || ''; }
  await addDoc(collection(db,'posts'), { title:title.value, content:content.value, category:category.value, imageUrl, userEmail:currentUser.email, userId:currentUser.uid, createdAt:serverTimestamp(), likedBy: [], likes: 0, views: 0, comments: 0 });
  alert('Đăng bài thành công'); e.target.reset(); loadPosts();
}
