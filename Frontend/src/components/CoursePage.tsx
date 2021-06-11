import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

export const GET_COURSE = gql`
  query GetCourseById($id: String!) {
    getSingleCourse(courseId: $id) {
      id
      title
      description
      link
      rating
    }
  }
`;

const CoursePage: React.FC<RouteComponentProps<{ id?: string }>> = ({
  match,
}) => {
  const courseId = match.params?.id;
  console.log(courseId);
  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: { id: courseId },
  });

  return (
    <>
      {data && (
        <Box py={10} px={20} bgcolor="black" color="white">
          
          <Grid container direction="row">
            <Grid item>
              <Box display="inline">
                <Typography variant="h5" component="h2" gutterBottom>
                  {data.getSingleCourse.title}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  {data.getSingleCourse.description}
                </Typography>
                <Typography variant="subtitle2" color="inherit">
                  {data.getSingleCourse.rating.toFixed(2)}
                </Typography>
                <Typography color="textSecondary">Course Rating:</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="inline">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${data.getSingleCourse.link}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
export default CoursePage;
