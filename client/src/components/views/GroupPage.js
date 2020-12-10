import React, { useState } from 'react'
import axios from 'axios';
import SearchResult from './SearchResult'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    margin:'70px',
    padding:'20px',
    fontSize:'40px',
    marginTop: '100px',
    textAlign:'center',
    // color: '#fff',
    // backgroundColor: '#253245'
  },

  elemt: {
    textAlign:'center',
    display:'block',
    margin:'10px',
  }
});


export default function GroupPage() {

  const [search, setSearch] = useState("");
  const [found, setFound] = useState([]);
  const [succ, setSucc] = useState(false);
  const [click, setClick] = useState(false);
  const classes = useStyles();

  function handleChange() {
    setClick(true);
    console.log(search);
    axios.get('/api/groups/search/'.concat(search))
      .then(res => {
        setSucc(res.data.message);
        if (res.data.user)
          setFound(prevFound => [res.data.user]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const error = click ? succ ? false : true : false;


  return (
    <Card className={classes.root}>

      <Typography variant='overline' color="primary" className={classes.elemt} style={{'fontSize':'70px'}}> EXPLORE
      </Typography>

      <TextField
        style={{
          'display':'block',
          'margin':'10px',
        }}
        name='caption'
        variant='outlined'
        multiline
        placeholder="Enter the email address of the user" value={search} onChange={(e) => {
          setSearch(e.target.value);
        }} />

      <Button variant='contained' color='primary'
        style={{

        }}
        onClick={() => {
          handleChange();
        }}>Search</Button>

      <Typography className={classes.elemt}>
        {succ ? found.map(e => <SearchResult user={e} key={e}/>) : ""}
      </Typography>

      {succ ?'':<Typography className={classes.elemt}>
        User not found
      </Typography>}

    </Card>
  );
}
