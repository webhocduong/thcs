import { auth, db } from './firebase.js';
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { renderShell, postCard, statCard, emptyState, avatarUrl, bindPostInteractions } from './ui.js';

onAuthStateChanged(auth, async(user)=>{ if(!user){ location.href='index.html'; return; } renderShell('mine', user); await renderDashboard(user); });
async function renderDashboard(user){
  let posts=[]; try{ const snap=await getDocs(query(collection(db,'posts'), where('userEmail','==',user.email))); posts=snap.docs.map(d=>({id:d.id,...d.data()})); }catch(e){ console.warn(e); }
  document.getElementById('mainContent').innerHTML = `<section class="profile-hero"><img src="${avatarUrl}" alt=""><div><span class="eyebrow">Dashboard người dùng</span><h1>${user.email}</h1><p>Email: ${user.email}</p><p>Vai trò: Thành viên • Ngày tham gia: ${new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString('vi-VN')}</p></div><a class="primary-btn" href="post.html">Viết bài mới</a></section><div class="stats-grid">${statCard('Tổng bài viết',posts.length,'📝')}${statCard('Đã đăng',posts.length,'✅')}${statCard('Chờ duyệt',0,'⏳')}${statCard('Cần sửa',0,'🛠')}${statCard('Bị từ chối',0,'🚫')}</div><section class="tabs"><button>Bài viết của tôi</button><button>Hồ sơ</button><button>Đổi mật khẩu</button><button>Thông báo</button><button>Yêu thích</button><button>Cài đặt</button></section><section class="post-grid">${posts.length?posts.map(p=>postCard(p,user)).join(''):emptyState('Bạn chưa có bài viết')}</section>`;
  bindPostInteractions(user);
}
