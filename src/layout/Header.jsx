import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../hooks/useTheme.js';

function SearchBar() {
  return <label className="top-search"><span>🔎</span><input data-global-search placeholder="Tìm bài viết, chuyên mục..." /></label>;
}
function NotificationButton() { return <button className="icon-btn" aria-label="Thông báo">🔔<span className="dot" /></button>; }
function ThemeButton() { const { theme, toggleTheme } = useTheme(); return <button className="icon-btn" onClick={toggleTheme} aria-label="Đổi giao diện">{theme === 'dark' ? '☀️' : '🌙'}</button>; }
function GuestActions() { return <div id="authArea"><Link className="primary-btn" to="/login">Đăng nhập</Link><Link className="icon-btn" to="/register">Đăng ký</Link></div>; }
function UserMenu() { const { user, logout } = useAuth(); return <div className="userMenu"><button id="userBox" className="icon-btn" type="button"><span className="avatar userInitial" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span><span>{user.name}</span></button><div className="dropdownMenu"><Link className="primary-btn" to="/profile">Hồ sơ</Link><Link className="primary-btn" to="/profile">Bài đã đăng</Link><button type="button" onClick={logout}>Đăng xuất</button></div></div>; }

export default function Header() {
  const { isLoggedIn } = useAuth();

  return <header className="site-header"><Link className="brand" to="/"><span className="brand-mark">HC</span><span><strong>THCS Hòa Chung</strong><small>Không gian chia sẻ kiến thức</small></span></Link><SearchBar /><nav className="top-nav"><Link to="/">Trang chủ</Link><Link to="/feed">Feed</Link><Link to="/write">Viết bài</Link><Link to="/profile">Của tôi</Link></nav><div className="header-actions"><NotificationButton /><ThemeButton />{isLoggedIn ? <div id="userArea"><UserMenu /></div> : <GuestActions />}</div></header>;
}
