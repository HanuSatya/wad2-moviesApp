import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  chipRoot: {
    display: "left",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "left",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chipSet: {
    display: "left",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chipLabel: {
    margin: theme.spacing(0.5),
  },
  fab: {  //New
    position: "fixed",
    top: theme.spacing(15),
    right: theme.spacing(2),
  },
}));

const PersonDetails = ( { person }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {person.biography}
      </Typography>
      <div className={classes.chipRoot}>

      <Paper component="ul" className={classes.chipSet}>
      <li>
          <Chip label={`Name: ${person.name}`} className={classes.chipLabel} color="primary" />
        </li>
      </Paper>

      <Paper component="ul" className={classes.chipSet}>
        <li>
          <Chip label={`Birthday: ${person.birthday}`} className={classes.chipLabel} color="primary" />
        </li>       
      </Paper>

      <Paper component="ul" className={classes.chipSet}>
        <li>
        <Chip label={`Place of birth: ${person.place_of_birth}`} className={classes.chipLabel} color="primary" />
        </li>
      </Paper>

      <Paper component="ul" className={classes.chipSet}>
        <li>
          <Chip label={`Known for department: ${person.known_for_department}`} className={classes.chipLabel} color="primary" />
        </li>          
      </Paper>

      <Paper component="ul" className={classes.chipSet}>
        <li>
          <Chip label={`Popularity: ${person.popularity}`} className={classes.chipLabel} color="primary" />
        </li>
      </Paper>

      <Paper component="ul" className={classes.chipSet}>
        <li>
        <Chip   label="Homepage: " link={`Homepage: ${person.homepage}`} className={classes.chipLabel} color="primary" />
        </li>
      </Paper>
      </div>
    </>
  );
};
export default  PersonDetails ; 