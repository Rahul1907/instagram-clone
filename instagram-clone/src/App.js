import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./App.css";
import instanamelogo from "./images/Instagram_logo.png";
import Post from "./Components/Post";
import { db,auth } from "./firebase";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser] = useState(null);

  const [modalStyle] = React.useState(getModalStyle);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // user has logged in...
        setUser(authUser);
      }
      else{
        // user has logged out...
        setUser(null);
      }
    })

    return () =>{
      //perform clean up
      unsubscribe();
    }
  },[user,username])

  // useEffect -> Runs a piece of code on a specific conditions
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>{alert(error.message)})
  };

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <div>
                <img className="app_headerImage" src={instanamelogo} alt="" />
              </div>
            </center>

            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignup}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img className="app_headerImage" src={instanamelogo} alt="" />
      </div>

      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Sign Up
      </Button>
      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
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
