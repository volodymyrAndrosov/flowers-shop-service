import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../images/brain1.jpg";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import serverURL from "../serverURL.js";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  Link as RouterLink,
} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useSelector(state => state.signIn);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/api/clients/login`, {
        email,
        password,
      });

      if (res.data.error) {
        console.log("res");
        console.log(res);
        setError(res.data.error);
        return;
      }

      setError("");

      dispatch({
        type: "SET_SIGNIN",
        payload: {
          signIn: true,
          userName: res.data.userName,
          token: res.data.token,
        },
      });

      history.push("/");
    } catch (e) {
      console.log(e);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <Grid container component='main' className={classes.root}>
      {signIn ? <Redirect to='/dashboard' /> : <Redirect to='/signin' />}
      <Snackbar open={!!error} autoHideDuration={6000}>
        <MuiAlert elevation={6} variant='filled' severity='error'>
          {error}
        </MuiAlert>
      </Snackbar>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              type='email'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            {/* <FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href='#' variant='body2'> */}
                <RouterLink to='/register'>Register</RouterLink>
                {/* </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
