import React from "react";
import Grid from "@material-ui/core/Grid";
import TVCard from "../tvCard";

const TVList = ( {movies, action }) => {
  let TVCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TVCard key={m.id} movie={m} action={action} />
    </Grid>
  ));
  return TVCards;
};

export default TVList; 