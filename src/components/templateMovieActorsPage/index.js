import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { getMoiveActors } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Link from "react-scroll/modules/components/Link";

const useStyles = makeStyles((theme) => ({
   root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

}));

const TemplateMovieActorsPage = ({ movie, children }) => {
  const classes = useStyles();
  const { data , error, isLoading, isError } = useQuery(
    ["credits", { id: movie.id }],
    getMoiveActors
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const credits = data.cast


  return (
    <div className={classes.root}>

      <Grid movie={movie} container spacing={10} style={{ padding: "15px" }}>
        <Grid item xs={10}>
          <div className={classes.gridListRoot}>
            <GridList cellHeight={500} className={classes.gridList} cols={7} >
              {credits.map((image) => (
                <div><GridListTile key={image.profile_path} className={classes.gridListTile} cols={3}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${image.profile_path}`}
                    alt={image.profile_path}
                                    
                  />
                  
                </GridListTile>
                <a href={'https://www.themoviedb.org/person/'+ image.id }> {`${image.name}`} </a>
                 </div> 
              ))}
            </GridList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
      </div>
  );
};

export default TemplateMovieActorsPage;