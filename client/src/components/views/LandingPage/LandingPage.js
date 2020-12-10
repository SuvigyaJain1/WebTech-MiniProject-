import React, { useState, useEffect } from 'react'
import Posts from '../Posts';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import NewPost from './NewPost';

// import { getPostContent } from "../../../_actions/post_actions";

const useStyles = makeStyles((theme) => ({
  edit: {
    position: 'fixed',
    right: '2em',
    bottom: '5em',
    zIndex: '4',

  },
  acc: {
    position: 'fixed',
    margin: '20px',
  },
  newpost: {
    'position': 'absolute',
    'padding': '10px',
    'margin': '10px',
    minHeight: '30%',
    minWidth: '60%',
    zIndex:'4',
  },
  overlay:{
    position:'fixed',
    margin:'0px',
    backgroundColor: 'rgba(245, 245, 245, 0.77)',
    height:'100%',
    'width': '100%',
    'zIndex':'3',
    left:'0px',
    top:'0px',
  }
}))

function LandingPage(props) {
    const styles = useStyles()
    const dispatch = useDispatch();
    const [state, setState] = useState({
      posts:[
        {
          "author": 'loading..',
          "caption": 'loading..',
          "content": "loading.."
        },
      ],
      showcreate:false,
      showoverlay:false,
    });



    useEffect( () => {
      const dataToSubmit = {group: 'home'}
      axios.post('/api/posts/getposts', dataToSubmit)
        .then( res => {
        if(res.status === 200)
          setState({...state, posts:res.data});
      })
      .catch(err => console.error(err.message))
    }, [])


    const handleFabClick = () => {
      setState({...state,
        showcreate : !state.showcreate,
        showoverlay: !state.showoverlay,
      })
    }
    return (

      <div className="app" style={{ margin: "40px" }}>
        {state.showoverlay && <div className={styles.overlay} />}
        <Fab color="primary" aria-label="add" className={styles.edit} onClick={handleFabClick}>
          <EditIcon />
        </Fab>
        {state.showcreate && <NewPost className={styles.newpost}/>}
        {
          <Posts posts={ state.posts } />
        }
      </div>
    )
}

export default LandingPage;
