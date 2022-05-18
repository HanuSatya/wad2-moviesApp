import React from "react";
// import { useContext} from 'react';
// import { MoviesContext } from '.././contexts/moviesContext';
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import TemplateMovieActorsPage from "../components/templateMovieActorsPage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import MovieRecom from "../components/templateMovieRecommendations";


const MovieDetailsPage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
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
          <PageTemplate movie={movie}>
          <MovieDetails movie={movie}>    
            </MovieDetails>
          </PageTemplate> 
          <TemplateMovieActorsPage movie={movie}>
          </TemplateMovieActorsPage>
          <MovieRecom movie={movie}>
          </MovieRecom>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;