import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import  {useQuery} from "react-query"
import { getMovies } from "../api/tmdb-api";

const HomePage = (props) => {
  const [pageNo, setPageNo] = useState(1);
  //localStorage.setItem('favourites', JSON.stringify(favourites))

  const { data, error, isLoading, isError } = useQuery(["discover",[pageNo]],() => getMovies(pageNo));

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const addToFavourites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
  };

  const movies = data ? data.results : [];

  return (
    <>
      <PageTemplate
        title='Discover Movies'
        movies={movies}
        selectFavourite={addToFavourites}
      />
      <button onClick={()=> {
        setPageNo(pageNo-1)
      }}>PREV</button>
      <label>{pageNo}</label>
      <button onClick={()=>{
        setPageNo(pageNo+1);
      }}>NEXT</button>
    </>
  );
  
};
export default HomePage;