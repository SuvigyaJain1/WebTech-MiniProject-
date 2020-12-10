import React, {useState, useEffect} from 'react';
import PostCard from './PostCard';
import axios from 'axios';

export default function Posts(props){

  const [name, setName] = useState("");

  const posts = (!props || !props.posts || ! Array.isArray(props.posts))?[]:props.posts.map((post) => {return <PostCard post={post} author={{"name":name}} />})
  return(
      <div style={{'margin':'20px'}}>
        { posts.length !== 0 ? posts : <h1 style={{
          "marginTop":"69px",
          "fontFamily":"Roboto"
        }}> Looks like there are no posts... </h1>}
      </div>
  )
}
