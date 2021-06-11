import React from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import CourseCard from "./CourseCard";
import { Box, Grid } from "@material-ui/core";

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

export default function Search({ s }: props) {
  console.log(s);
  const vsr = "z";

  const GET_ALL_COURSES_QUERY = gql`
    query searchCourses($search: String!) {
      getCourses(search: $search) {
        id
        title
        description
        rating
        link
      }
    }
  `;

  const { data } = useQuery(GET_ALL_COURSES_QUERY, {
    variables: { search: `${s}` },
  });

  return (
    <Box p={5} mx="10%">
      <Grid container spacing={2} direction="row" xs={12}>
        <Grid item xs={3}>
          {data && (
            <>
              {data.getCourses.map((c: Course, i: number) => (
                <CourseCard course={c} />
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
