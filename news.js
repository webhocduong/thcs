import { auth, db } from './firebase.js';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { renderShell, mockPosts, postCard, emptyState, bindPostInteractions } from './ui.js';

let allPosts = [];
onAuthStateChanged(auth, async(user)=>{ renderShell('feed', user); await loadPosts(user); bindFeed(); });
async function loadPosts(user){
  try{ const snap = await getDocs(query(collection(db,'posts'), orderBy('createdAt','desc'))); allPosts = snap.docs.map(d=>({ id:d.id, ...d.data(), views: d.data().views || 0, comments: d.data().comments || 0 })); }catch(e){ console.warn(e); allPosts = []; }
  if(!allPosts.length) allPosts = mockPosts;
  renderFeed(allPosts, user);
}
function renderFeed(posts, user){
  document.getElementById('mainContent').innerHTML = `<section class="page-head"><span class="eyebrow">Feed</span><h1>Tất cả bài viết mới</h1><p>Lọc, tìm kiếm và đọc các chia sẻ mới nhất trong cộng đồng.</p></section><section class="toolbar"><input id="feedSearch" placeholder="Tìm trong feed..."><button data-filter="new">Mới nhất</button><button data-filter="popular">Phổ biến</button><button data-filter="liked">Được thích nhiều</button><button data-filter="commented">Bình luận nhiều</button></section><section id="feedList" class="post-grid">${posts.length?posts.map(p=>postCard(p,user)+deleteButton(p,user)).join(''):emptyState('Chưa có bài viết')}</section><button class="load-more">Tải thêm</button>`;
}
function deleteButton(p,user){ return user && (user.uid===p.userId || user.email===p.userEmail) ? `<button class="deleteBtn" data-id="${p.id}">Xóa bài</button>` : ''; }
function bindFeed(){
  document.getElementById('feedSearch')?.addEventListener('input', e=>{ const q=e.target.value.toLowerCase(); document.getElementById('feedList').innerHTML = allPosts.filter(p=>(p.title+p.content).toLowerCase().includes(q)).map(p=>postCard(p, auth.currentUser)).join('') || emptyState('Không tìm thấy bài phù hợp'); bindPostInteractions(auth.currentUser); });
  document.querySelectorAll('[data-filter]').forEach(btn=>btn.onclick=()=>{ const type=btn.dataset.filter; const sorted=[...allPosts].sort((a,b)=> type==='liked'?b.likes-a.likes:type==='commented'?b.comments-a.comments:b.views-a.views); document.getElementById('feedList').innerHTML=sorted.map(p=>postCard(p, auth.currentUser)).join(''); bindFeed(); });
  bindPostInteractions(auth.currentUser);
  document.querySelectorAll('.deleteBtn').forEach(btn=>btn.onclick=async()=>{ if(confirm('Bạn có chắc muốn xóa?')){ await deleteDoc(doc(db,'posts',btn.dataset.id)); location.reload(); } });
}
