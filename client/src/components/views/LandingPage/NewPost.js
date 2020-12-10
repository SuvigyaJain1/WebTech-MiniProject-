import React from 'react';
import Paper from '@material-ui/core/Paper';
import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  newpost: {
    'position': 'fixed',
    right:theme.spacing(1),
    bottom:'10em',
    'padding': '10px',
    'margin': '10px',
    minHeight: '30%',
    minWidth: '80%',
    zIndex:'4',

  },
  form : {
    margin:'10px',
    'padding': '10px',
    textAlign:'center',

  }
}))

export default function NewPost(){
  const styles = useStyles();

  const [state, setState] = useState({
    'caption':'',
    'content':'',
  });

  const handleChange = (e) => {
    let newState = state;
    newState[e.target.name] = e.target.value;
    setState(newState);
  }

  const handleSubmit = () => {
    const dataToSubmit = {
      'caption': state.caption,
      'content': state.content,
    }
    axios.post('/api/posts/createpost', dataToSubmit)
    .then(response => {
      console.log(response.data)
    })
  }

  return (
      <Paper className={styles.newpost}>

        <form className={styles.form} noValidate autoComplete="off"  onSubmit={handleSubmit}>
          <Typography variant='overline' color="primary">CREATE POST</Typography>
          <div>
            <TextField
              onChange={handleChange}
              name='caption'
              style={{'width':'100%', 'margin':'10px'}}
              id="form-caption"
              label="Caption"
              placeholder="Give a nice caption to describe your post"
              variant="outlined"
            />
            <TextField
              onChange={handleChange}
              style={{'width':'100%', 'margin':'10px'}}
              id="form-content"
              label="Content"
              name='content'
              multiline
              rows={4}
              placeholder=" Type what you want to tell the world "
              variant="outlined"
            />
            <Button type='submit' variant='contained' color='secondary'>
              Post !
            </Button>
          </div>
        </form>
      </Paper>
  )
}
