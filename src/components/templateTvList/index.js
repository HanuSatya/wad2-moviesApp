import React from "react";
import Header from "../headerMovieList";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TVList from "../TVlist";


const useStyles = makeStyles((theme) => ({
  root: { 
    backgroundColor: "#bfbfbf",
    minHeight: "100vh",
    paddingTop: theme.spacing(7),
  }
}));

function TVListPageTemplate({ movies, title, action }) {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Grid container >
          <Grid item xs={12}>
            <Header title={title} />
          </Grid>
          <Grid item container spacing={5}>
          <TVList action={action} movies={movies} />

          </Grid>
        </Grid>

      </div>
  );
}
export default TVListPageTemplate; 



