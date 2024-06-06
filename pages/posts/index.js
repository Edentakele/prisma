// pages/posts/index.js

import { useState, useEffect } from 'react';
import PostList from '../../components/PostList';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        setPosts(prevPosts => [...prevPosts, data]);
        setNewPost({ title: '', content: '' });
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div>
      <h1>Posts</h1>
      <PostList posts={posts} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
