import {
  Box,
  Button,
  createStyles,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";

const REGISTER_MUTATION = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String!
    $isTeacher: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
      isTeacher: $isTeacher
    ) {
      name
      email
    }
  }
`;

interface Values {
  name: string;
  email: string;
  password: string;
  isTeacher: string;
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

function Register() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    isTeacher: "",
  });
  const [loginErrorAlert, setLoginErrorAlert] = React.useState<String>("");

  const classes = useStyles();
  const history = useHistory();

  const [register] = useMutation(REGISTER_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      isTeacher: formState.isTeacher,
    },
    onCompleted: ({ register }) => {
      // localStorage.setItem("AUTH_TOKEN", login.token);
      alert("User Sucessfully Registered!");
      history.push("/");
    },
  });
  return (
    <Box width="20%" height="50%" mx="auto" p={1} my="4%">
      <Box my={3}>
        <Typography variant="h6">Sign Up and Start Learning!</Typography>
      </Box>
      <Divider />
      <Box my={3}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            isTeacher: "",
          }}
          validate={values => {
            const errors: Partial<Values> = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (values.password.length < 6) {
              errors.password = "Password must have more than 6 characters";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              formState.email = values.email;
              formState.password = values.password;
              formState.name = values.name;
              formState.isTeacher = values.isTeacher;

              try {
                await register();
              } catch (e) {
                if(e.message === "Failed to fetch"){

                }
                else if(e.message == "Username already exists"){
                  setLoginErrorAlert("User exists!");
                }
                
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
                    variant="outlined"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <Box color="red" fontSize="8">
                    {errors.name && touched.name && errors.name}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Box color="red" fontSize="8">
                    {errors.email && touched.email && errors.email}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <Box color="red" fontSize="8">
                    {errors.password && touched.password && errors.password}
                  </Box>
                </Grid>
                <Grid item>
                  <RadioGroup role="group" onChange={handleChange}>
                    <Grid direction="row">
                      <FormControlLabel
                        value="true"
                        name="isTeacher"
                        control={<Radio />}
                        label="Teacher"
                      />
                      <FormControlLabel
                        value="false"
                        name="isTeacher"
                        control={<Radio />}
                        label="Strudent"
                      />
                    </Grid>
                  </RadioGroup>
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

export default Register;
