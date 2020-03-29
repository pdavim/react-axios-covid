import React from "react";
import { observer, inject } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import FolderIcon from "@material-ui/icons/Folder";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 40,
    color: "white"
  },
  questionText: {
    fontWeight: 900
    //textTransform: "capitalize"
  }
}));

const AboutC = inject("Store")(
  observer(props => {
    let CoronaVirusDataPT = props.Store.virusInfoData;
    let classes = useStyles();
    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.questionText}>
            {CoronaVirusDataPT[1].question} {CoronaVirusDataPT[5].name} ?
          </Typography>
          <Typography variant="body"> {CoronaVirusDataPT[1].whatis}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider variant="middle" light />
          <Typography variant="h6" className={classes.questionText}>
            {CoronaVirusDataPT[2].question} {CoronaVirusDataPT[5].name} ?
          </Typography>

          <List dense={true} disablePadding={true}>
            <ListItem>
              <ListItemText primary={CoronaVirusDataPT[2].sintoms[1]} />
            </ListItem>

            <ListItem>
              <ListItemText primary={CoronaVirusDataPT[2].sintoms[2]} />
            </ListItem>

            <ListItem>
              <ListItemText primary={CoronaVirusDataPT[2].sintoms[3]} />
            </ListItem>

            <ListItem>
              <ListItemText primary={CoronaVirusDataPT[2].sintoms[4]} />
            </ListItem>

            <ListItem>
              <ListItemText primary={CoronaVirusDataPT[2].sintoms[5]} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" light />
          <Typography variant="h6" className={classes.questionText}>
            {CoronaVirusDataPT[3].question} {CoronaVirusDataPT[5].name} ?
          </Typography>
          <Typography variant="body">
            {CoronaVirusDataPT[3].transmition}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" light />
          <Typography variant="h6" className={classes.questionText}>
            {CoronaVirusDataPT[4].question} {CoronaVirusDataPT[5].name} ?
          </Typography>
          <Typography variant="body">
            {CoronaVirusDataPT[4].incumbationPeriod}
          </Typography>
        </Grid>
      </Grid>
    );
  })
);

export default AboutC;
