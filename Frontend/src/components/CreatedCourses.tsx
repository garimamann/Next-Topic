import React from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import CourseCard from "./CourseCard";
import { Box, Grid } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import { useHistory } from "react-router";

interface Course {
  id: string;
  title: string;
  description: string;
  rating: number;
  link: string;
}
interface props {
  s: string;
}

const GET_CREATED_COURSES = gql`
  {
    getCreatedCourse {
        id
      title
      description
      rating
      link
    }
  }
`;



export default function CreatedCourse() {
    const history = useHistory();
  const { data } = useQuery(GET_CREATED_COURSES);
  const loadCouseHandler = (newAlignment: boolean) => {
    if (newAlignment) {
    }
    history.push("/user");
  };

  return (
    <Box p={5} mx="10%">
        <ToggleButton
              value={false}
              aria-label="left aligned"
              onClick={() => loadCouseHandler(true)}
            >
              Subscribed Courses
            </ToggleButton>
      <Grid container spacing={2} direction="row" xs={12}>
        <Grid item xs={3}>
          {data && (
            <>
              {data.getCreatedCourse.map((c: Course, i: number) => (
                <CourseCard course={c} />
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
