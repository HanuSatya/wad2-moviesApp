import React from "react";
import { useParams } from "react-router-dom";
import TVDetails from "../components/tvDetails";
import { getTvDetail } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import MovieHeader from "../components/headerMovie";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(7),
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
}));

const TvDetailsPage = (props) => {
  const { id } = useParams();

  const classes = useStyles();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["tvdetails", { id: id }],
    getTvDetail
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <div className={classes.root}>
        <MovieHeader movie={movie} />
        <TVDetails movie={movie} />
        </div>

        </>
      ) : (
        <p>Waiting for TV details</p>
      )}
    </>
  );
};

export default TvDetailsPage;