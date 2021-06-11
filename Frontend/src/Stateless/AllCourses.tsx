import React from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import CourseCard from "../components/CourseCard";
import { Box, Grid, makeStyles } from "@material-ui/core";

export const GET_ALL_COURSES_QUERY = gql`
  { 
    getCourses(search: "") {
      id
      title
      description
      rating
      link
    }
  }
`;

const USER_RATING = gql`
  mutation userrating($courseId: String!) {
    userRating(courseId: $courseId)
  }
`;

interface Course {
  id: string;
  title: string;
  description: string;
  rating: number;
  link: string;
}

const useStyles = makeStyles({
  gridItem: {
    width: 1000,

  }
});

export default function AllCourses() {
  const classes = useStyles();
  const { data } = useQuery(GET_ALL_COURSES_QUERY, { errorPolicy: "all" });


  return (
    <Box p={5} mx="10%">
      <Grid
        container
        spacing={2}
        direction="column"
        xs={12}

      >

        {data && (
          <>
            {data.getCourses.map((c: Course, i: number) => (
              <Grid item xs={3} className={classes.gridItem}>
                <CourseCard course={c} />
              </Grid>
            ))}
          </>
        )}

      </Grid>
    </Box>
  );
}
