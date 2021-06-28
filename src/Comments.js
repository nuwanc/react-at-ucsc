import { useState } from "react";
import { db } from "./Firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';

function SelectRating({selectedRating,onSelect}) {
    let ratings = ["1", "2", "3", "4", "5"];
    return (
      <ul className="ratings">
        {ratings.map((rating, index) => {
          return (
            <li
              key={index}
              style={
                rating === selectedRating ? { color: "#d0021b" } : null
              }
              onClick={(e)=>onSelect(rating)}
            >
              {rating}
            </li>
          );
        })}
      </ul>
    );
}

function CommentsGrid(props) {
    return (
      <ul className="popular-list">
        {props.comments
          .filter(comment => {
            return comment.rating === props.selectedRating;
          })
          .map((comment, index) => {
            return (
              <li className="popular-item" key={index}>
                <ul className="space-list-item">
                  <li>
                    <img
                      className="avatar"
                      src={"https://avatars.dicebear.com/api/micah/" + comment.name + ".svg" }
                      alt={"Avatar for " + comment.name}
                      title={comment.labels}
                    />
                  </li>
                  <li>@{comment.name}</li>
                  <div className="comment">{comment.comment}</div>
                </ul>
              </li>
            );
          })}
      </ul>
    );
  }
  


function Comments() {
    const [rating,setRating] = useState('1');
    const commentsRef = db.collection('comments');
    const query = commentsRef.orderBy('rating');

    const [values,loading,error] = useCollectionData(query);

    return (
        <div>
            <SelectRating selectedRating={rating} onSelect={setRating}/>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {values && <CommentsGrid comments={values} selectedRating={rating}/>}
        </div>

    )
}

export default Comments;