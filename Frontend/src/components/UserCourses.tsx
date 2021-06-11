import React, { useContext, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import CourseCard from "./CourseCard";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  TextField,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import { Formik } from "formik";
import { LoginContext } from "../LoginContext";
import { useHistory } from "react-router";

const GET_ALL_COURSES_QUERY = gql`
  {
    getSubscribedCourses {
      id
      title
      description
      rating
      link
    }
  }
`;

const GET_CREATED_COURSES = gql`
  mutation {
    getCreatedCourse {
      title
    }
  }
`;

const CREATE_COURSE = gql`
  mutation createCourse($createCourseInput: createCourseInput!) {
    createCourse(createCourseInput: $createCourseInput) {
      title
      description
      link
    }
  }
`;

interface Course {
  id: string;
  title: string;
  description: string;
  rating: number;
  link: string;
}

export default function AllCourses() {
  const history = useHistory();
  const [loadSubCourses, setLoadSubCourses] = useState(true);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    link: "",
  });
  const { data } = useQuery(GET_ALL_COURSES_QUERY, { errorPolicy: "all" });
  const [open, setOpen] = useState(false);
  const [createMutation] = useMutation(CREATE_COURSE, {
    variables: {
      createCourseInput: {
        title: formState.title,
        description: formState.description,
        link: formState.link,
      },
    },
    onCompleted: data => {
      alert("courseCreated");
    },
  });

  const [createdCourses, { loading, error }] = useMutation(
    GET_CREATED_COURSES,
    {
      onCompleted: createdCourse => {},
      ignoreResults: false,
    }
  );

  const value = useContext(LoginContext);

  const loadCouseHandler = (newAlignment: boolean) => {
    if (newAlignment) {
    }
    history.push("/user/created");
  };

  const dialogOpenHandler = () => {
    setOpen(true);
  };

  interface Values {
    title: string;
    description: string;
    link: string;
  }

  // console.log(loadSubCourses);
  return (
    <Box p={5} mx="10%">
      {value.isTeacher && (
        <Box display="inline">
          <ToggleButtonGroup exclusive>
            <ToggleButton
              value={true}
              aria-label="centered"
              onClick={() => loadCouseHandler(true)}
            >
              Created Courses
            </ToggleButton>
          </ToggleButtonGroup>
          <Box display="inline" m={3}>
            <Fab color="secondary" aria-label="add" onClick={dialogOpenHandler}>
              <AddIcon />
            </Fab>
          </Box>
        </Box>
      )}

      <Grid container spacing={2} direction="column" xs={12}>
        {data &&
          data.getSubscribedCourses.map((c: Course, i: number) => (
            <Grid item xs={4}>
              <CourseCard course={c} />
            </Grid>
          ))}
      </Grid>

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Create new Course</DialogContentText>
          <Formik
            initialValues={{
              title: "",
              description: "",
              link: "",
            }}
            validate={values => {
              const errors: Partial<Values> = {};
              if (!values.title) {
                errors.title = "Required";
              }
              if (!values.description) {
                errors.description = "Required";
              }
              if (!values.link) {
                errors.link = "Required";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                formState.title = values.title;
                formState.description = values.description;
                formState.link = values.link;

                try {
                  await createMutation();
                } catch (e) {
                  alert(e.message);
                }
                setOpen(false);

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
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      variant="outlined"
                    />
                    <Box color="red" fontSize="8">
                      {errors.title && touched.title && errors.title}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      variant="outlined"
                    />
                    <Box color="red" fontSize="8">
                      {errors.description &&
                        touched.description &&
                        errors.description}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="link"
                      placeholder="Link"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.link}
                      variant="outlined"
                    />
                    <Box color="red" fontSize="8">
                      {errors.link && touched.link && errors.link}
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <DialogActions>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-25 pointer"
                      >
                        Create
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
