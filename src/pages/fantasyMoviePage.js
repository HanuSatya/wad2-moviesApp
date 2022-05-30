import React, { useContext, useState } from "react";
import { AuthContext } from './../contexts/authContext';

const FantasyMoviePage = props => {
    const context = useContext(AuthContext)
    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [genres, setGenres] = useState("");
    const [runtime, setRuntime] = useState("");
    const [release_date, setRelease_date] = useState("");
    

    const movieregister = () => {

          console.log("Moviereg")
          context.movieregister(title, overview, genres, runtime, release_date);
          
        }
      

    return (
        <>
          <h2>FantasyMovie Page</h2>
          <p>You can create your fantasy movie here....</p>
          <input value={title} placeholder="title" onChange={e => {
            setTitle(e.target.value);
          }}></input><br />
          <input value={overview} placeholder="overview" onChange={e => {
            setOverview(e.target.value);
          }}></input><br />
          <input value={genres} placeholder="genres" onChange={e => {
            setGenres(e.target.value);
          }}></input><br />
          <input value={runtime} type="number" placeholder="runtime" onChange={e => {
            setRuntime(e.target.value);
          }}></input><br />
          <input value={release_date} type="date" placeholder="release date" onChange={e => {
            setRelease_date(e.target.value);
          }}></input><br />
        
          <button onClick={movieregister}>FMRegister</button>
        </>
      );
};

export default FantasyMoviePage;
    