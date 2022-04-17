import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link  } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

import FavouriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies/favourites">Favourites</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/movies/favourites" component={FavouriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route exact path="/" component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));