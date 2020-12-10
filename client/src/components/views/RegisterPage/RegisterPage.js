import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
    title: {
      fontSize: '1.5em',
    }
  },
}));



function RegisterPage(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
        .required('Name is required'),
        lastName: Yup.string()
        .required('Last Name is required'),
        email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
        password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastName,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          // dispatch(registerUser(dataToSubmit)).then(response => {
          //   if (response.payload.success) {
          //     props.history.push("/login");
          //   } else {
          //     alert(response.payload.err.errmsg)
          //   }
          // })

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              history.push("/login");
            } else {
              alert("Sign-Up Failed. Email might already be in use")
            }
          })

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
              minHeight: 'calc(100vh - 20px)',
              backgroundAttachment:'fixed'
            }}/>
            <Paper className={classes.paper}>
              <div className='title'>
                <Typography variant='overline' color='secondary' className={classes.title}>Sign up</Typography>
              </div>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">

                <div className = {classes.root} >
                  <TextField required
                    id="name"
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name ? 'text-input error' : 'text-input'
                    }
                    helperText={errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  />
                </div>
                <div className = {classes.root} >
                  <TextField required
                    label="Last Name"
                    id="lastName"
                    placeholder="Enter your Last Name"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                    }
                  />
                </div>
                <div className = {classes.root} >
                  <TextField required
                    label="Email"
                    id="email"
                    placeholder="Enter your Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                    helperText={errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  />
                </div>

                <div className = {classes.root} >
                  <TextField required
                    label="Password"
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                    helperText={errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )} />
                </div>

                <div className = {classes.root} >
                  <TextField required
                    label="Confirm Password"
                    id="confirmPassword"
                    placeholder="Enter your password again"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                    }
                    helperText={errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback">{errors.confirmPassword}</div>
                    )} />
                </div>

                <div className = {classes.root} >
                  <Button onClick={handleSubmit} color="primary" type='submit' variant='contained' disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
            );
            }}
          </Formik>
        );
      };


        export default RegisterPage
