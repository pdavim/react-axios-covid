import React from "react";
import { inject, observer } from "mobx-react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import stringToArray from "../../functions/stringToArray";

const useStyles = makeStyles(theme => ({
  rootGrid: {
    display: "flex",
    padding: 20
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000000",
    // height: "100%",
    // width: "100%",
    paddingLeft: 0,
    paddingRigth: 0
  },
  imageGrid: {},
  image: {
    maxWidth: "100%",
    minWidth: "200px"
  },
  imgThumb: {
    maxWidth: "200px"
  },
  chip: {
    fontWeight: 900,
    fontSize: 10
    //padding: 5
  },
  newsThumbnail: {
    //width: "100%",
    height: "300px",
    padding: 20,
    [theme.breakpoints.down("xs")]: {
      padding: 5,
      height: "350px"
    }
  },
  paperBackdrop: {
    // padding: "120px",
    marginRight: "120px",
    marginLeft: "120px",
    paddingLeft: "120px",
    paddingRight: "120px",
    paddingTop: "80px",
    paddingBottom: "80px",
    //width: "100%",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "40px",
      paddingRight: "40px",
      paddingTop: "30px",
      paddingBottom: "30px"
      // width: "100%"
    }
  },
  chipSpan: {
    padding: 5,
    paddingBottom: 15
  },
  title: {
    fontWeight: 900,
    fontSize: "24px",
    textAlign: "center"
  }
}));

const NewsSinglePage = props => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  //console.log("newsSinglePage ", props);
  let item = props;

  let keywordsObject = item.keywords;
  let kewordsArray = stringToArray(item.keywords);
  /* console.log("keywordsObject ", keywordsObject);
  console.log("kewordsArray ", kewordsArray);
  console.log("kewordsArray Typeof ", typeof kewordsArray);
  console.log("provider", item.provider); */
  const classes = useStyles();
  return (
    <Grid>
      <Paper>
        <Grid container className={classes.newsThumbnail} spacing={1}>
          <Grid item xs={12}>
            {item.title}
          </Grid>
          <Grid item xs={12}>
            <img src={item.image} className={classes.imgThumb} />
          </Grid>
          <Grid xs={12}>
            <Button
              variant="outlined"
              //color="primary"
              onClick={handleToggle}
              value={item.title}
            >
              Read More
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Paper className={classes.paperBackdrop}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.title}>{item.title}</Typography>
            </Grid>

            <Grid item xs={4} className={classes.imageGrid}>
              <img src={item.imageUrl} className={classes.image} />
            </Grid>
            <Grid item xs={8}>
              <Typography>{item.body}</Typography>
            </Grid>
            <Grid xs={4}>
              <Grid container className={classes.imageGrid} spacing={2}>
                {kewordsArray.map(word => (
                  <Grid item className={classes.chipSpan}>
                    <Chip label={word} className={classes.chip} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={8}>
              <Typography>
                <b>Provider: </b>
                {item.provider.name}
              </Typography>
              <Typography>
                <b>Published: </b>
                {item.datePublished}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Backdrop>
    </Grid>
  );
};

export default inject("Store")(observer(NewsSinglePage));
