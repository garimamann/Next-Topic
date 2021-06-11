import {
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Field, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";
import Register from "./Register";
import {LoginContext} from "../LoginContext";

const LOGIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password){
      isTeacher
      token
    }
  }
`;

interface Values {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loginErrorAlert, setLoginErrorAlert] = React.useState<String>("");
  const history = useHistory();
  const classes = useStyles();

  const value = useContext(LoginContext);

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: data => {
      localStorage.setItem("AUTH_TOKEN", data.signin.token);
      value.setLoginStatus({isLoggedin:true,isTeacher:data.signin.isTeacher});
      alert("User Sucessfully Loggedin!");
      history.push("/all");
    },
  });
  return (
    <Box width="20%" height="50%" mx="auto" p={1} my="10%">
      <Box my={3}>
        <Typography variant="h6">Log In to Your Account!</Typography>
      </Box>
      <Divider />
      <Box my={3}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={values => {
            const errors: Partial<Values> = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (values.password.length < 6) {
              errors.password = "Password must have more than 6 character";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              formState.email = values.email;
              formState.password = values.password;

              try {
                await login();
              } catch (e) {
                setLoginErrorAlert("Invalid Credentials!");
              }

              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-column h4 justify-around"
            >
              <Grid spacing={2} container justify="center">
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    variant="outlined"
                  />
                  <Box color="red" fontSize="8">
                    {errors.email && touched.email && errors.email}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    variant="outlined"
                  />
                  <Box color="red" fontSize="8">
                    {errors.password && touched.password && errors.password}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Link to="/register">Dont have an account?</Link>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-25 pointer"
                  >
                    Submit
                  </Button>
                  {loginErrorAlert && (
                    <Alert severity="error">{loginErrorAlert}</Alert>
                  )}
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Login;
