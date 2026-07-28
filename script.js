import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { renderShell, renderHeader, categories, mockPosts, categoryCard, postCard, statCard } from './ui.js';

onAuthStateChanged(auth, (user)=>{ renderShell('home', user); renderHome(user); bindAuth(user); });

function renderHome(user){
  document.getElementById('mainContent').innerHTML = `
    <section class="hero"><div><span class="eyebrow">Cộng đồng học tập THCS</span><h1>Chia sẻ kiến thức, cùng nhau tiến bộ mỗi ngày.</h1><p>Khám phá bài viết mới, chuyên mục nổi bật và kinh nghiệm học tập từ học sinh THCS Hòa Chung.</p><div class="hero-search"><input placeholder="Tìm kiếm kiến thức..."><a href="news.html">Tìm kiếm</a></div></div></section>
    <section id="categories" class="section"><div class="section-title"><h2>Chuyên mục</h2><a href="news.html">Xem tất cả</a></div><div class="category-grid">${categories.map(categoryCard).join('')}</div></section>
    <section class="section"><div class="section-title"><h2>Bài viết mới</h2><a href="post.html">Viết bài</a></div><div class="post-grid">${mockPosts.map(postCard).join('')}</div></section>
    <section class="section two-col"><div><h2>Bài nổi bật</h2>${mockPosts.filter(p=>p.featured).map(postCard).join('')}</div><div><h2>Được yêu thích</h2>${mockPosts.sort((a,b)=>b.likes-a.likes).slice(0,3).map(postCard).join('')}</div></section>
    <section class="section"><h2>Tác giả nổi bật</h2><div class="stats-grid">${['Minh Anh','Hoàng Nam','Lan Chi','Gia Bảo'].map((n,i)=>statCard(n, `${36-i*5} bài`, '⭐')).join('')}</div></section>`;
}

function bindAuth(user){
  renderHeader(user);
  const authArea = document.getElementById('authArea');
  if(authArea && !user){ authArea.innerHTML = `<input type="email" id="email" placeholder="Email"><input type="password" id="password" placeholder="Mật khẩu"><button id="registerBtn">Đăng ký</button><button id="loginBtn">Đăng nhập</button>`; }
  document.getElementById('registerBtn')?.addEventListener('click', async()=>{ try{ await createUserWithEmailAndPassword(auth, email.value, password.value); }catch(e){ alert(e.message); } });
  document.getElementById('loginBtn')?.addEventListener('click', async()=>{ try{ await signInWithEmailAndPassword(auth, email.value, password.value); }catch(e){ alert(e.message); } });
  document.getElementById('logoutBtn')?.addEventListener('click', async()=>{ await signOut(auth); location.reload(); });
  document.getElementById('profileBtn')?.addEventListener('click', ()=> location.href='myposts.html');
  document.getElementById('myPostsBtn')?.addEventListener('click', ()=> location.href='myposts.html');
}
