import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes,  Route, Link, useParams  } from "react-router-dom";

const client = axios.create({
  baseURL: "http://backend:8000/api/posts",
});

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await client.get("/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/", { title, body });
      console.log("Post created:", response.data);
      fetchPosts();
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <Link to={`/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.body}</p>
        </div>
      ))}
      <h2>Create New Post</h2>
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchPost = async () => {
    try {
      const response = await client.get(`/${id}`);
      setPost(response.data);
      setTitle(response.data.title);
      setBody(response.data.body);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  // const updatePost = async () => {
  //   try {
  //     const response = await client.put(`/${id}`, {
  //       title,
  //       body,
  //     });
  //     console.log("Post updated:", response.data);
  //     fetchPost();
  //   } catch (error) {
  //     console.error("Error updating post:", error);
  //   }
  // };

  const patchPost = async () => {
    try {
      const response = await client.patch(`/${id}`, {
        title,
        body,
      });
      console.log("Post updated:", response.data);
      fetchPost();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async () => {
    try {
      await client.delete(`/${id}`);
      console.log(`Post ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  
  useEffect(() => {
    fetchPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <br />
      {/* <button onClick={updatePost}>put</button> */}
      <button onClick={deletePost}>Delete</button>
      <button onClick={patchPost}>update</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
