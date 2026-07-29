import PostCard from './PostCard.jsx';
export default function PopularPosts({ posts }) { return <div>{[...posts].sort((a,b)=>b.likes-a.likes).slice(0,3).map((post) => <PostCard key={post.id} post={post} />)}</div>; }
