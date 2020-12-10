import React from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import { USER_SERVER } from '../../Config';

function NavBar(props) {

    let history = useHistory();
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        button: {
            color: 'white',
        },

    }));
    const classes = useStyles();

    const handleLogin = () => {
        history.push('/login');
    }

    const handleSignin = () => {
        history.push('/register')
    }

    const handleLogout = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    }

    return (
        <div className={classes.root}>
          <AppBar position="fixed" style={{
            backgroundColor: '#c9352e',
            marginBottom: "20px"
          }}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                        Home
          </Typography>
                    {!props.loggedIn && <Button className={classes.button} onClick={handleLogin}>Login</Button>}
                    {!props.loggedIn && <Button className={classes.button} onClick={handleSignin}>Sign Up</Button>}
                    {props.loggedIn && <Button className={classes.button} onClick={handleLogout}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </div>
    )

}

const mapStateToProps = (state, ownProps) => {
    let user = state.user

    return {
        loggedIn: user.userData && user.userData.isAuth
    }
}
export default connect(mapStateToProps)(NavBar);
