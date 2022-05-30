import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getGenres } from "../api/tmdb-api";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { AuthContext } from './../contexts/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 170,
    backgroundColor: "rgb(255, 255, 255)",
  },
}));

const FantasyMoviePage = props => {
  const classes = useStyles();
    const context = useContext(AuthContext)
    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedgenre, setSelectedGenre] = useState([]);
    const [runtime, setRuntime] = useState("");
    const [release_date, setRelease_date] = useState("");
  

    const loadGenres = () => {
      getGenres().then((data) => {
       
        if (data.genres[0].name !== "All") {
          data.genres.unshift({ id: "0", name: "All" });
        }
        setGenres(data.genres);
      });
    }

    useEffect(() => {
      loadGenres();
    }, []);


    const movieregister = () => {

          console.log("Moviereg")
          context.movieregister(title, overview, selectedgenre, runtime, release_date);
          
        }

        const handleGenreChange = (e) => {
          // handleUserImput(e, "genre", e.target.value);
          setSelectedGenre(e.target.value);
        };
      

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

<FormControl className={classes.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl><br />
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
    