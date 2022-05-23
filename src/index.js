import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import Topratedpage from './pages/topratedMoivesPage';
import PersonDetailsPage from './pages/personDetailsPage';
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import TvPage from "./pages/tv";
import TvDetailsPage from "./pages/tvDetails";
import PrivateRoute from "./routes/privateRoute";
// import AuthHeader from "./components/authHeader/authHeader";
import MovieProvider from "./contexts/moviesContext";


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

      <AuthContextProvider>
      {/* <AuthHeader /> */}
        <SiteHeader />
        <MoviesContextProvider>
        {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/public">Public</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul> */}
          <MovieProvider>
      <Switch>
      <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/tv/:id" component={TvDetailsPage} />
        <Route path="/tv" component={TvPage} />
        {/* <Route path="/public" component={PublicPage} /> */}
        {/* <PrivateRoute path="/movies" component={Movies} />
        <PrivateRoute path="/profile" component={Profile} /> */}
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <PrivateRoute exact path="/movies/favourites" component={FavouriteMoviesPage} />
        <PrivateRoute path="/movies/upcoming" component={UpcomingMoviesPage} />
        <Route exact path="/movies/toprated" component={Topratedpage} />
        <Route path="/person/:person_id" component={PersonDetailsPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route exact path="/" component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
      </MovieProvider>
      </MoviesContextProvider>
      </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));