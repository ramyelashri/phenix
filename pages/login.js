import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useUserStore from 'store/userStore';
import { useRouter } from 'next/router';
import {useFormik} from "formik";
import * as Yup from "yup";


export default function Login() {
  const router = useRouter();
  const [login, user] = useUserStore(state => [state.login, state.user]);

  const loginFormik = useFormik({
    initialValues: {
      username: 'some_user',
      password: 'password'
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
    }),
    onSubmit: values => {
      login(values)
    },
  });

  if(user) {
    router.push('/cart')
  }

  return (
    <div>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <br/>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form noValidate onSubmit={loginFormik.handleSubmit}>
        <TextField
          error={loginFormik.touched.username && loginFormik.errors.username}
          helperText={loginFormik.touched.username && loginFormik.errors.username ? loginFormik.errors.username : ''}
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          value={loginFormik.values.username}
        />
        <TextField
          error={loginFormik.touched.password && loginFormik.errors.password}
          helperText={loginFormik.touched.password && loginFormik.errors.password ? loginFormik.errors.password : ''}
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          value={loginFormik.values.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign In
        </Button>
        <hr/>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
