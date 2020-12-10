import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import axios from 'axios';

const postStyle = {
  minWidth: "50%",
  width: "80%",
  // backgroundColor: "#F4D9D8",
  color: "#100118",
  padding: "25px",
  margin: "10px",
  display: "inline-block"
}

function PostCard(props) {
  const [name, setName] = useState("loading");
  useEffect(() => {
    axios.get("/api/users/userdata/".concat(props.post.author))
    .then(res => {
      console.log("Function called: "+res.data.name);
      setName(res.data.name + " " + res.data.lastname);
    })

  }, [props]);

  return (

      <Card className="card" style={postStyle} >
        <div class="card-body">
          <h4 class="card-title">{props.post.caption}</h4>
          <h5 class="card-author">{name}</h5>
          <p class="card-text">{props.post.content}</p>

        </div>
        </Card >
  )
}

export default PostCard;
