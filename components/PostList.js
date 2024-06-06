// components/PostList.js

export default function PostList({ posts }) {
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    );
  }
  