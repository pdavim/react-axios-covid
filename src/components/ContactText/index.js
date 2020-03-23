import React from "react";

//import Material ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// data import
import contactPageData from "../../assets/data/contactPageData";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 20,
    color: "white"
  },
  grid: {},
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 900
  }
}));

const ContactText = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title}>
          {contactPageData[0].title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {contactPageData[1].textAuthor} {contactPageData[2].author}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{contactPageData[3].authorEmail}</Typography>
      </Grid>
      <Grid item xs={12}>
        <a href={contactPageData[4].authorSite}>
          {contactPageData[5].authorSiteText}
        </a>
      </Grid>
    </Grid>
  );
};

export default ContactText;
