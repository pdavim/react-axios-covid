import React from "react";

//import Material ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// data import
import contactPageData from "../../assets/data/contactPageData";
import Form from "../../components/Form";

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
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100
  },
  textLeft: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: 500,
    padding: 20
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

      <Grid item xs={4} className={classes.form}>
        <Grid item xs={12}>
          <Typography className={classes.textLeft}>
            {contactPageData[1].textAuthor} <br /> {contactPageData[2].author}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.textLeft}>
          <a href={contactPageData[4].authorSite}>
            {contactPageData[5].authorSiteText}
          </a>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.textLeft}>
            {contactPageData[3].authorEmail}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4} className={classes.form}>
        <Form className={classes.form} />
      </Grid>
      <Grid item xs={4} className={classes.form}>
        <Grid item xs={12}>
          <Typography className={classes.textLeft}>
            {contactPageData[6].contactText01}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.textLeft}>
            {contactPageData[7].contactText02}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactText;
