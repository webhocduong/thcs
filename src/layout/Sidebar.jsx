import { NavLink } from 'react-router-dom';

const items = [
  ['/', 'Trang chủ', '🏠'], ['/feed', 'Feed', '📰'], ['/#categories', 'Chuyên mục', '🗂'], ['/profile', 'Bài viết của tôi', '📝'], ['/write', 'Viết bài', '✍️'], ['#favorites', 'Yêu thích', '💙'], ['#history', 'Lịch sử', '🕘'], ['#admin', 'Quản trị', '🛡'],
];

export default function Sidebar() { return <aside className="left-sidebar"><button className="drawer-label">☰ Menu</button>{items.map(([to, label, icon]) => <NavLink key={label} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`} to={to}><span>{icon}</span>{label}</NavLink>)}</aside>; }
