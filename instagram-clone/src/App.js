import React, { useState, useEffect } from "react";
import "./App.css";
import instanamelogo from "./images/Instagram_logo.png";
import Post from "./Components/Post";
import {db} from './firebase';


function App() {
  const [posts, setPosts] = useState([]);

  // useEffect -> Runs a piece of code on a specific conditions
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>{
        return doc.data();
      }))
    });
  }, []);

  return (
    <div className="App">
      <div className="app_header">
        <img className="app_headerImage" src={instanamelogo} alt="" />
      </div>
      {posts.map((post,i) => {
        return (
          <Post
            key={i}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}
    </div>
  );
}

export default App;
