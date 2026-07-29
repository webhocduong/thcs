import { Link } from 'react-router-dom';
import { avatarUrl } from '../data/posts.js';
import { useTheme } from '../hooks/useTheme.js';

function SearchBar() {
  return <label className="top-search"><span>🔎</span><input data-global-search placeholder="Tìm bài viết, chuyên mục..." /></label>;
}
function NotificationButton() { return <button className="icon-btn" aria-label="Thông báo">🔔<span className="dot" /></button>; }
function ThemeButton() { const { theme, toggleTheme } = useTheme(); return <button className="icon-btn" onClick={toggleTheme} aria-label="Đổi giao diện">{theme === 'dark' ? '☀️' : '🌙'}</button>; }
function UserMenu() { return <div className="userMenu"><div id="userBox"><img src={avatarUrl} className="avatar" alt="Avatar" /><span>hocvien@example.com</span></div><div className="dropdownMenu"><Link className="primary-btn" to="/profile">Hồ sơ</Link><Link className="primary-btn" to="/profile">Bài đã đăng</Link><Link className="primary-btn" to="/login">Đăng xuất</Link></div></div>; }

export default function Header() {
  return <header className="site-header"><Link className="brand" to="/"><span className="brand-mark">HC</span><span><strong>THCS Hòa Chung</strong><small>Không gian chia sẻ kiến thức</small></span></Link><SearchBar /><nav className="top-nav"><Link to="/">Trang chủ</Link><Link to="/feed">Feed</Link><Link to="/write">Viết bài</Link><Link to="/profile">Của tôi</Link></nav><div className="header-actions"><NotificationButton /><ThemeButton /><div id="authArea"></div><div id="userArea"><UserMenu /></div></div></header>;
}
