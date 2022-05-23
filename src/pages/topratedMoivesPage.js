import React, {useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTopratedmoives} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const Topratedpage = (props) => {
  const [pageNo, setPageNo] = useState(1);
  const { data, error, isLoading, isError } = useQuery(["Toprated",[pageNo]],() => getTopratedmoives(pageNo));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };
    const newFilters =
      type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    setFilterValues(newFilters);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  
  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
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

export default Topratedpage;