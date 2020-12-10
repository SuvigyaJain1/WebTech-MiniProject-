import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';


import bg from './bg.png'
const useStyles = makeStyles((theme) => ({
  root: {
      marginBottom: theme.spacing(1),
      width: '25ch',
      paddingTop: theme.spacing(0.5),
  },
  paper: {
    // display: 'inline-block',
    // '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(4),
      textAlign: 'center',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform:'translate(-50%, -50%)',
    // },
  },
  title: {
    fontSize: '1em',
  },
  // background: {
  //   backgroundImage: 'url("../../../../public/unnamed.jpg")'
  // }
}));


function LoginPage(props) {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';
  const switchPage = () => {
    history.push('/register');
  }
  return (

      <Formik
        initialValues={{
          email: initialEmail,
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
          password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password
            };

            dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/home");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
                alert('Check your Account or Password again')
                console.log('Check your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              alert('Check your Account or Password again')
              console.log('Check your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;

          return (
            <div>
              <div style={{

                backgroundImage: "url(" + bg + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                margin: '0px',
                minHeight: 'calc(100vh - 10px)',
                backgroundAttachment:'fixed'
              }}/>
              <Card className={classes.paper}>
                <div className='title'>
                  <Typography variant='overline' color='secondary' className={classes.title}>Log in</Typography>
                </div>
                {/* <Title level={2}>Log In</Title> */}
                <form onSubmit={handleSubmit}>

                  <div className={classes.root}>
                    <TextField
                      className={classes.root}
                      variant='outlined'
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Email"
                      className={
                        errors.email && touched.email ? 'text-input error' : 'text-input'
                      }

                      helperText={errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}

                    />
                  </div>
                  <div className={classes.root}>
                    <TextField
                      className={classes.root}
                      variant='outlined'
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Password"
                      className={
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                      }
                      helperText={errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    />
                  </div>

                  <FormControlLabel control={<Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}/>} label="Remember Me" />

                  {/* <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                    forgot password
                  </a> */}
                  <div className={classes.root}>
                    <Button type='submit' variant='contained' color='secondary' className="login-form-button" disabled={isSubmitting} onSubmit={handleSubmit}>
                      Log in
                    </Button>
                  </div>
                  <div className={classes.root}>
                    Or <Link to="/register" onClick={switchPage}>register now!</Link>
                  </div>
                </form>
              </Card>
            </div>
          );
          }}
      </Formik>
  );
};

export default withRouter(LoginPage);
