import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate.js';

export default function PostCard({ post }) {
  return <article className="post-card"><img className="post-thumb" src={post.cover} alt={post.title || 'Bài viết'} /><div className="post-body"><span className="badge">{post.category || 'Học tập'}</span><h3>{post.title || 'Bài viết mới'}</h3><p>{post.summary || post.content || 'Nội dung đang được cập nhật.'}</p><div className="post-date">📅 {formatDate(post.createdAt)}</div><div className="post-actions"><button className="action-btn like-btn">❤️ <span className="like-count">{post.likes || 0}</span></button><button className="action-btn comment-btn">💬 <span className="comment-count">{post.comments || 0}</span></button><button className="action-btn share-btn">🔄 <span>{post.shares || 0}</span></button></div><Link className="read-more" to={`/post/${post.id}`}>Đọc tiếp</Link></div></article>;
}
