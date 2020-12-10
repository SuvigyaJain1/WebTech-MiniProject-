import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import img from './img.png';
import Posts from './Posts';

const useStyles = makeStyles({

  container: {
    overflow: 'hidden',
    margin: '0',
    'minHeight': '100%',
  },
  statBar: {
    width: '100%',
    minHeight: '8%',
    color: 'white',
    fontSize: '40px',
    display: 'block',
    position: 'fixed',
    'marginRight': '20px',
    top: '30%',
    marginBottom: '20px',
    // background: '#556270',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #FF6B6B, #556270)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #FF6B6B, #556270)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    verticalAlign: 'center'

  },
  posts: {
    marginTop: '300px',
  },
  pfp: {
    position: 'fixed',
    top: 'calc(30% - 145px)',
    right: 'calc(50% - 70px)',
    zIndex: '2',
    height: '140px',
    width: '140px',
    padding: '0px',
    borderRadius: '70px'
  },
  cover: {
    textAlign: 'center',
    background: '#485563',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #29323c, #485563)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #29323c, #485563)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    width: '100%',
    display: 'block',
    position: 'fixed',
    top: '0',
    height: '30%',
  },
  profile: {
    width: '100%',
    display: 'block',
    top: '30%',
    height: '70%',
  }
});

export default function ProfilePage(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    posts: [
      {
        "author": 'loading..',
        "caption": 'loading..',
        "content": "loading.."
      },
    ],
  });

  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [username, setName] = useState("");

  useEffect(() => {
    let dataToSubmit = { group: 'home', email: props.email ? props.email : null }
    axios.post('/api/posts/getposts', dataToSubmit)
      .then(res => {
        if (res.status === 200)
          setState({ ...state, posts: res.data });
      })
      .catch(err => console.error(err.message))

    dataToSubmit = { email: props.email ? props.email : null }
    axios.post('/api/users/userdataemail', dataToSubmit)
      .then(res => {
        if (res.status === 200) {

          console.log(res.data.followers)
          setFollowerCount(res.data.followers.length)
          setFollowingCount(res.data.followees.length)
          setName(res.data.name + " " + res.data.lastname)
        }

        console.log(res.data);
      })
      .catch(err => console.error(err.message))


  }, [])

  return (
    <div className={classes.container}>

      <Avatar className={classes.pfp} alt="Profile Image here" src={img} />

      <div className={classes.cover}>

      </div>

      <div className={classes.profile}>

        <div className={classes.statBar}>
          <Typography variant="overline" style={{ display: 'inline', fontSize: '17px', margin: '0px 40px 0px 10px' }}>Followers: {followerCount}</Typography>
          <Typography variant="overline" style={{ display: 'inline', fontSize: '17px', margin: '0px 40px 0px 10px' }}>Following: {followingCount} </Typography>
          <Typography variant="overline" style={{ display: 'inline', fontSize: '17px', margin: '0px 40px 0px 10px' }}>Posts: {state.posts.length} </Typography>

          <Typography style={{
            zIndex: '10',
            display: 'inline',
            color: 'white',
            float: 'right',
            marginRight: '20px',
            fontSize: '25px',
          }} variant='overline'>{username}</Typography>
        </div>

        <div className={classes.posts}>
          <Posts posts={state.posts} />
        </div>
      </div>

    </div>
  );
}
