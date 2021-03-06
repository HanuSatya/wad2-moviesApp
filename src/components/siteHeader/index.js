import React, { useState , useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {AuthContext }from "../../contexts/authContext";


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'none',
  },
  offset: theme.mixins.toolbar,
}));

const SiteHeader = () => {
  const classes = useStyles();
  const authcontext = useContext(AuthContext);
  const  history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorEl);
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Top Rated Moives", path: "/movies/toprated" },
    { label: "TV", path: "/tv" },
    { label: "FantasyMovie", path: "/fantasyMoviePage" },        
  ];

  const logoutprint = () => {
    if(authcontext != null)
    {
      if(authcontext.isAuthenticated)
      {
        return  <Button key={"logout"} color="inherit" onClick={() => logout()}>{"logout"}</Button>
      }
    }
  }
  const loginprint = () => {
    if(authcontext != null)
    {
      if(!authcontext.isAuthenticated)
      {
        return  <Button key={"login"} color="inherit" onClick={() => login()}>{"login"}</Button>
      }
    }
  }

  const logout= (e) =>{
    localStorage.clear(); 
    if(authcontext != null){
    authcontext.signout();
    }
  }
  const login= (e) =>{
    history.push('/login');
  }

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return ( 
    <>
      <AppBar className={classes.appbar}
      position="fixed" elevation={0} color='primary'> 
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" className={classes.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>

              ))}
              {loginprint()}
              {logoutprint()}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SiteHeader;