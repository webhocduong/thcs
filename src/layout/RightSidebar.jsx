import { Link } from 'react-router-dom';
import { avatarUrl, newMembers, posts } from '../data/posts.js';

function MiniPost({ post }) { return <Link className="mini-post" to={`/post/${post.id}`}><img src={post.cover} alt="" /><span>{post.title}</span></Link>; }
export default function RightSidebar() { const top = [...posts].sort((a,b)=>b.likes-a.likes).slice(0,3); return <aside className="right-sidebar"><section className="panel"><h3>Bài nổi bật</h3>{posts.filter((p)=>p.featured).map((p)=><MiniPost key={p.id} post={p}/>)}</section><section className="panel"><h3>Được yêu thích</h3>{top.map((p)=><MiniPost key={p.id} post={p}/>)}</section><section className="panel"><h3>Thành viên mới</h3>{newMembers.map((name)=><div className="member" key={name}><img src={avatarUrl} alt="" /><span>{name}</span></div>)}</section><section className="panel stats"><h3>Thống kê</h3><b>128</b><span>bài viết</span><b>2.4k</b><span>lượt tương tác</span></section></aside>; }
