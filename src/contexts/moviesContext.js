import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies } from "../api/movie-api";

export const MoviesContext = createContext(null);


const MoviesContextProvider = (props) => {
const [favourites, setFavourites] = useState([]);
const [myReviews, setMyReviews] = useState([]);
const [movies,setMovies] = useState(null);
const [authenticated, setAuthenticated] = useState(false);


  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  useEffect(() => {
    if(authenticated){
       getMovies().then(result => {
         console.log(result);
         setMovies(result);
       });}
     },[authenticated]);

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        movies,
        setAuthenticated
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;