import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import Typography from '@material-ui/core/Typography'
function SearchResult(props) {
  const [succ, setSucc] = useState(false);
  console.log(props)

  const addFollower = () => {
    const body = {
      'follower_email': props.user.email,
    }
    axios.post('api/users/addfollower', body).then((res, err) => {
      if (err) {
        console.log(err)
        throw err;
      }
      if (res.status === 200) {
        console.log("follower added successfully");
        setSucc(true);
      }
    })
  }
  return (
    <div>
      <div style={{
        fontFamily: 'Bebas Nue',
        height: "50px",
        width: "400px",
        backgroundColor: "#504B4C",
        color: "white",
        verticalAlign: "center",
        margin: "100px auto",
        fontSize: "30px",
        padding: "10px"
      }}>

        {props.user.name + " " + props.user.lastname}
      </div>
      <Typography variant="pre" >{succ ? "Follow Successful!" : <Button color='primary' variant='contained' onClick={addFollower}>FOLLOW</Button>}</Typography>

    </div>


  )
}

export default SearchResult;
