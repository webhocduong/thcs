import { Link } from 'react-router-dom';
export default function NotFound(){ return <section className="empty-state"><h3>Không tìm thấy trang</h3><p>Đường dẫn không tồn tại.</p><Link className="primary-btn" to="/">Về trang chủ</Link></section>;}
