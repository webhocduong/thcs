import { categories, mockPosts, newMembers } from './mockData.js';

export const adminEmail = 'ioe2thcshc@gmail.com';
export const avatarUrl = 'https://i.imgur.com/HeIi0wU.png';

export function initTheme(){
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = saved;
  document.querySelectorAll('[data-theme-toggle]').forEach((btn)=>{
    btn.textContent = saved === 'dark' ? '☀️' : '🌙';
    btn.onclick = ()=>{
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
      document.querySelectorAll('[data-theme-toggle]').forEach((b)=> b.textContent = next === 'dark' ? '☀️' : '🌙');
    };
  });
}

export function renderHeader(user){
  const el = document.getElementById('appHeader');
  if(!el) return;
  el.innerHTML = `
    <a class="brand" href="index.html"><span class="brand-mark">HC</span><span><strong>THCS Hòa Chung</strong><small>Không gian chia sẻ kiến thức</small></span></a>
    <label class="top-search"><span>🔎</span><input data-global-search placeholder="Tìm bài viết, chuyên mục..."></label>
    <nav class="top-nav"><a href="index.html">Trang chủ</a><a href="news.html">Feed</a><a href="post.html">Viết bài</a><a href="myposts.html">Của tôi</a></nav>
    <div class="header-actions"><button class="icon-btn" aria-label="Thông báo">🔔<span class="dot"></span></button><button class="icon-btn" data-theme-toggle aria-label="Đổi giao diện">🌙</button><div id="authArea"></div><div id="userArea">${user ? userMenu(user) : ''}</div></div>`;
  initTheme();
}

export function userMenu(user){
  return `<div class="userMenu"><div id="userBox"><img src="${avatarUrl}" class="avatar" alt="Avatar"><span>${user.email}</span></div><div class="dropdownMenu"><button id="profileBtn">Hồ sơ</button><button id="myPostsBtn">Bài đã đăng</button><button id="logoutBtn">Đăng xuất</button></div></div>`;
}

export function renderShell(active='home', user=null){
  document.body.classList.add('app-body');
  const root = document.getElementById('app');
  if(!root) return;
  root.insertAdjacentHTML('beforebegin', '<header id="appHeader" class="site-header"></header>');
  root.insertAdjacentHTML('afterend', footer());
  renderHeader(user);
  root.className = 'app-shell';
  root.innerHTML = `${leftSidebar(active, user)}<main class="main-content" id="mainContent"></main>${rightSidebar()}`;
}

function leftSidebar(active, user){
  const items = [['home','Trang chủ','index.html','🏠'],['feed','Feed','news.html','📰'],['categories','Chuyên mục','index.html#categories','🗂'],['mine','Bài viết của tôi','myposts.html','📝'],['write','Viết bài','post.html','✍️'],['fav','Yêu thích','#favorites','💙'],['history','Lịch sử','#history','🕘']];
  if(user?.email === adminEmail) items.push(['admin','Quản trị','admin.html','🛡']);
  return `<aside class="left-sidebar"><button class="drawer-label">☰ Menu</button>${items.map(([key,label,href,icon])=>`<a class="side-link ${active===key?'active':''}" href="${href}"><span>${icon}</span>${label}</a>`).join('')}</aside>`;
}

export function rightSidebar(){
  const top = [...mockPosts].sort((a,b)=>b.views-a.views).slice(0,3);
  return `<aside class="right-sidebar"><section class="panel"><h3>Bài nổi bật</h3>${mockPosts.filter(p=>p.featured).map(miniPost).join('')}</section><section class="panel"><h3>Bài xem nhiều</h3>${top.map(miniPost).join('')}</section><section class="panel"><h3>Thành viên mới</h3>${newMembers.map(n=>`<div class="member"><img src="${avatarUrl}" alt=""><span>${n}</span></div>`).join('')}</section><section class="panel stats"><h3>Thống kê</h3><b>128</b><span>bài viết</span><b>2.4k</b><span>lượt đọc</span></section></aside>`;
}

function miniPost(p){ return `<a class="mini-post" href="news.html"><img src="${p.imageUrl}" alt=""><span>${p.title}</span></a>`; }
export function postCard(p){
  const date = p.createdAt?.toDate ? p.createdAt.toDate().toLocaleDateString('vi-VN') : (p.date || 'Mới đăng');
  const img = p.imageUrl || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80';
  return `<article class="post-card"><img class="post-thumb" src="${img}" alt="${p.title||'Bài viết'}"><div class="post-body"><span class="badge">${p.category||'Học tập'}</span><h3>${p.title||'Bài viết mới'}</h3><p>${p.content||'Nội dung đang được cập nhật.'}</p><div class="post-meta"><img src="${avatarUrl}" alt=""><span>${p.author||p.userEmail||'Tác giả'}</span><span>${date}</span></div><div class="post-actions"><span>👁 ${p.views||0}</span><span>💙 ${p.likes||0}</span><span>💬 ${p.comments||0}</span><a class="read-more" href="post.html">Đọc tiếp</a></div></div></article>`;
}
export function categoryCard(c){ return `<article class="category-card"><div class="category-icon">${c.icon}</div><h3>${c.name}</h3><p>${c.desc}</p><span>${c.count} bài viết</span></article>`; }
export function statCard(label, value, icon='📌'){ return `<div class="stat-card"><span>${icon}</span><strong>${value}</strong><small>${label}</small></div>`; }
export function emptyState(text){ return `<div class="empty-state">📭<h3>${text}</h3><p>Hãy quay lại sau hoặc thử bộ lọc khác.</p></div>`; }
function footer(){ return `<footer class="site-footer"><a>Giới thiệu</a><a>Điều khoản</a><a>Chính sách</a><a>Liên hệ</a><span>© 2026 THCS Hòa Chung</span></footer>`; }
export { categories, mockPosts };
