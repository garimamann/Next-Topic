import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useMutation, gql, useQuery } from "@apollo/client";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import {
  Box,
  CardMedia,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { RateReviewTwoTone } from "@material-ui/icons";
import { useHistory } from "react-router";
import { GET_ALL_COURSES_QUERY } from "../Stateless/AllCourses";
import { display } from "@material-ui/system";
import StarIcon from "@material-ui/icons/Star";

const SUBSCRIBED_MUTATION = gql`
  mutation SubscribeToCourse($courseId: String!) {
    subscribeToCourse(courseId: $courseId)
  }
`;

const RATING_MUTATION = gql`
  mutation addRating($courseId: String!, $rating: String!) {
    addRating(courseId: $courseId, rating: $rating)
  }
`;

const NO_OF_STUDENTS = gql`
  query totalStudents($courseId: String!) {
    getStudentsOfCourse(courseId: $courseId)
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Course {
  id: String;
  title: string;
  description: string;
  rating: number;
  link: string;
}

const useStyles = makeStyles({
  root: {
    width: 1100,
    marginTop: 24,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardMedia: {
    width: "70%",
    marginRight: "10%",
  },
});

interface CardProps {
  course: Course;
}

export default function OutlinedCard({ course }: CardProps) {
  const classes = useStyles();

  const [subscribe, setSubscribe] = useState("Subscribe");
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  
  const { data } = useQuery(NO_OF_STUDENTS, {
    variables: { courseId: course.id },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const cardClickHandler = () => {
    history.push(`/course/${course.id}`);
  };

  const rateingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      ratingFunction({
        variables: { courseId: course.id, rating: event.target.defaultValue },
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [subscribeFunction] = useMutation(SUBSCRIBED_MUTATION, {
    variables: {
      courseId: course.id,
    },
    onCompleted: data => {
      alert("Subscribed!");
      // history.push("/");
    },
  });

  const [ratingFunction] = useMutation(RATING_MUTATION, {
    onCompleted: data => {
      alert(data.addRating);
      // history.push("/");
    },
  });

  const subscribeHandler = () => {
    setSubscribe("Subscribed");
    try {
      subscribeFunction();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent onClick={cardClickHandler}>
          <Grid container direction="row">
            <Grid item xs={5}>
              <Box display="inline" width="auto">
                <CardMedia
                  className={classes.cardMedia}
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  width="70"
                  image={`https://img.youtube.com/vi/${course.link}/hqdefault.jpg`}
                  title="Contemplative Reptile"
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              {data && (
                <Box display="inline">
                  <Typography variant="h6" component="h2" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {course.description}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Course Rating: {course.rating.toFixed(2)} <StarIcon />
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Students: ({data.getStudentsOfCourse})
                  </Typography>
                  {/* <Typography className={classes.pos} color="textSecondary">
            Your Rating :
          </Typography> */}
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              subscribeHandler();
            }}
          >
            {subscribe}
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              handleClickOpen();
            }}
          >
            Rate it!
          </Button>
        </CardActions>
      </Card>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Rate the course
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <RadioGroup role="group" onChange={rateingHandler}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
