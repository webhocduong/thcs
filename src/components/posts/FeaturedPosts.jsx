import PostCard from './PostCard.jsx';
export default function FeaturedPosts({ posts }) { return <div>{posts.filter((post) => post.featured).map((post) => <PostCard key={post.id} post={post} />)}</div>; }
