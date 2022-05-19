import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTv } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";

import TVListPageTemplate from "../components/templateTvList";
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

const DiscoverTvPage = (props) => {
 const [page, setPage] =useState(1)
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  const { data, error, isLoading, isError } = useQuery(["discovertv",page], getTv);

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
  console.log(movies)
  const displayedMovies = (movies);

  return (
    <>
      <TVListPageTemplate
        title="Discover TV"
        movies={displayedMovies}
        action={(movie) => {
        }}
      />
   
   </>
  );
};

  export default DiscoverTvPage;
