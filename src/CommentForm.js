import {useState} from 'react';
import { db , auth } from "./Firebase";
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const signInAsGuest = () => {
    auth.signInAnonymously();
  }

  return (
    <>
      <button className="button" onClick={signInWithGoogle}>Sign in with Google</button><button className="button" onClick={signInAsGuest}>Sign in as Guest</button>
      <span>To Comment!</span>
    </>
  )

}

function CommentForm() {
    const [name,setName] = useState('');
    const [rating,setRating] = useState('5');
    const [comment,setComment] = useState('');
    const [user] = useAuthState(auth);
    const [hidden,setHidden] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentsRef = db.collection('comments');
        await commentsRef.add({
            name,
            rating,
            comment
        })
        setName('');
        setRating('5');
        setComment('');
        setHidden(true);
    }

    return (
        <>
        {user ? <button className="button" onClick={(e)=>setHidden(!hidden)}>Add Comment</button> : <SignIn />}
        <form className="column"
        style={hidden ? { display: "none" } : null}
        onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Name"
          type="text"
          autoComplete="off"
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <label htmlFor="rating">Rating</label>
        <span>
          <label>
            <input
              type="radio"
              name="rating"
              value="1"
              defaultChecked={rating === "1"}
              onClick={(e)=>setRating(e.target.value)}
            />{" "}
            1
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="2"
              defaultChecked={rating === "2"}
              onClick={(e)=>setRating(e.target.value)}
            />{" "}
            2
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="3"
              defaultChecked={rating === "3"}
              onClick={(e)=>setRating(e.target.value)}
            />{" "}
            3
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="4"
              defaultChecked={rating === "4"}
              onClick={(e)=>setRating(e.target.value)}
            />{" "}
            4
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="5"
              defaultChecked={rating === "5"}
              onClick={(e)=>setRating(e.target.value)}
            />{" "}
            5
          </label>
        </span>
        <label htmlFor="text">Comment</label>
        <textarea
          id="text"
          placeholder="text"
          autoComplete="off"
          name="text"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
        />
        <button className="button" type="submit" disabled={!name}>
          Submit
        </button>
        </form>
        </>
    )
}

export default CommentForm;