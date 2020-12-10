import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { useHistory } from 'react-router'
// components
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// icons
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    color: '#fff',
    backgroundColor: '#253245'
  },
});

export default function Navigator() {
  const classes = useStyles()
  const [value, setValue] = useState("home");
  const history = useHistory();

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      // showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon style={{ color: 'white' }} />}
        onClick={() => { history.push('./home') }}
        value="home"
        style={{ color: 'white' }} />
      <BottomNavigationAction
        label="Explore"
        icon={<GroupIcon style={{ color: 'white' }} />}
        style={{ color: 'white' }}
        value="groups"
        onClick={() => { history.push('./groups') }} />
      <BottomNavigationAction
        label="Profile"
        icon={<PersonIcon style={{ color: 'white' }} />}
        style={{ color: 'white' }}
        value="profile"
        onClick={() => { history.push('./profile') }} />
    </BottomNavigation>
  );
}
