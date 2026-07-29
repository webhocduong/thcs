import { Link } from 'react-router-dom';
import CategoryCard from '../components/categories/CategoryCard.jsx';
import StatCard from '../components/common/StatCard.jsx';
import FeaturedPosts from '../components/posts/FeaturedPosts.jsx';
import PopularPosts from '../components/posts/PopularPosts.jsx';
import PostCard from '../components/posts/PostCard.jsx';
import { categories, posts } from '../data/posts.js';

export default function Home() { return <><section className="hero"><div><span className="eyebrow">Cộng đồng học tập THCS</span><h1>Chia sẻ kiến thức, cùng nhau tiến bộ mỗi ngày.</h1><p>Khám phá bài viết mới, chuyên mục nổi bật và kinh nghiệm học tập từ học sinh THCS Hòa Chung.</p><div className="hero-search"><input placeholder="Tìm kiếm kiến thức..." /><Link to="/feed">Tìm kiếm</Link></div></div></section><section id="categories" className="section"><div className="section-title"><h2>Chuyên mục</h2><Link to="/feed">Xem tất cả</Link></div><div className="category-grid">{categories.map((category)=><CategoryCard key={category.name} category={category}/>)}</div></section><section className="section"><div className="section-title"><h2>Bài viết mới</h2><Link to="/write">Viết bài</Link></div><div className="post-grid">{posts.map((post)=><PostCard key={post.id} post={post}/>)}</div></section><section className="section two-col"><div><h2>Bài nổi bật</h2><FeaturedPosts posts={posts}/></div><div><h2>Được yêu thích</h2><PopularPosts posts={posts}/></div></section><section className="section"><h2>Tác giả nổi bật</h2><div className="stats-grid">{['Minh Anh','Hoàng Nam','Lan Chi','Gia Bảo'].map((name,index)=><StatCard key={name} label={name} value={`${36-index*5} bài`} icon="⭐" />)}</div></section></>; }
