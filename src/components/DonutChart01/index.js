import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const useStyles = makeStyles({
  paperCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: props => props.backgroundChart01,
    marginLeft: 1,
    marginRight: 1,
    height: 50
    //width: 150
  },
  paperCardCharts: {
    background: "rgb(32,32,32,0.6)",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 1,
    marginRight: 1

    //height: 50
  },
  chartHeader: {
    color: props => props.headertextColor,
    fontWeight: 400,
    fontSize: 16
  },
  chartSubheader: {
    color: props => props.subheadertextColor,
    textAlign: "left",
    fontWeight: 900,
    fontSize: 16,
    paddingBottom: 5
  },
  chart: {
    //backgroundColor: "rgb(255,255,255,0.1)",
    color: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 8
  }
});

const DonutChart01 = props => {
  //const { color } = props;
  console.log("card01 props ", props);
  const classes = useStyles(props);
  return (
    <Paper className={classes.paperCardCharts}>
      <Grid item className={classes.chart}>
        <Typography className={classes.chartHeader}>
          {props.headerText}
        </Typography>
        <Typography className={classes.chartSubheader}>
          {props.subheaderText}
        </Typography>

        <Chart
          options={props.options}
          type="donut"
          series={props.series}
          //className={classes.chart}
        />
      </Grid>
    </Paper>
  );
};

DonutChart01.propTypes = {
  backgroundChart01: PropTypes.isRequired,
  options: PropTypes.isRequired,
  series: PropTypes.isRequired
};

export default DonutChart01;
