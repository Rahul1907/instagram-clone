import React, { useState, useEffect } from "react";
import Avtar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import firebase from "firebase";
import "../css/post.css";

function Post({ postId, username, user, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("commnets")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("commnets").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avtar
          className="post_avtar"
          alt="Rahul"
          src="https://placeimg.com/640/480/animals"
        />
        <h3>{username}</h3>
      </div>
      {/* header ---- avtar */}

      <img className="post_image" src={imageUrl} alt="" />
      {/* image */}
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>
      {/* username + caption */}
      <div className="post_comments">
        {comments.map((comment) => {
          return (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          );
        })}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
