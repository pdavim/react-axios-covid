import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  paperCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: props => props.background,
    marginLeft: 1,
    marginRight: 1,
    height: 50
    //width: 150
  },
  textCard: {
    color: "white",
    fontWeight: 400,
    fontSize: 14
  },
  textContent: {
    color: "white",
    textAlign: "left",
    fontWeight: 900,
    fontSize: 18
  }
});

const Card01 = props => {
  //const { color } = props;
  console.log("card01 props ", props);
  const classes = useStyles(props);
  return (
    <Paper className={classes.paperCard}>
      <Typography className={classes.textCard}>{props.textCard}</Typography>
      <Typography className={classes.textContent}>
        {props.textContent}
        {props.textContentdivider}
        {props.textAfterContent}
        {props.textAfterContentSymbol}
      </Typography>
    </Paper>
  );
};
Card01.propTypes = {
  background: PropTypes.string,
  textContent: PropTypes.string,
  textContentdivider: PropTypes.string,
  textAfterContent: PropTypes.string,
  textAfterContentSymbol: PropTypes.string,
  textCard: PropTypes.string
};

export default Card01;
