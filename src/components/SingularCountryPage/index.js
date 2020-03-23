import React from "react";
import { inject, observer } from "mobx-react";
import Chart from "react-apexcharts";

//import Material UI
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { display } from "@material-ui/system";

var optionsChart = {
  chart: {
    type: "line"
  },
  series: [
    {
      name: "sales",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }
  ],
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 20
  }
}));

const SingularCountryPage = observer(props => {
  console.log("Singular page props ", props);
  let datesArray = props.headers[0];
  let arrayLength = datesArray.length;
  let dates = datesArray.slice(5, arrayLength);

  let confirmedArray = props.confirmed[0];
  let confirmedArrayLength = confirmedArray.length;
  let confirm = confirmedArray.slice(5, confirmedArrayLength);

  let deadArray = props.dead[0];
  let deadArrayLength = deadArray.length;
  let died = deadArray.slice(5, deadArrayLength);

  let recoveredArray = props.recovered[0];
  let recoveredArrayLength = recoveredArray.length;
  let recover = recoveredArray.slice(5, recoveredArrayLength);

  console.log("Header are ", dates);
  console.log("Confirm are ", confirm);
  console.log("Died are ", died);

  let options = {
    chart: {
      type: "line",
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#247BA0", "#FF1654", "#24A34E"],
    stroke: {
      curve: "smooth"
    },
    markers: {
      size: 1
    },
    series: [
      {
        type: "line",
        name: "cases",
        data: confirm
      },
      {
        type: "line",
        name: "dead",
        data: died
      },
      {
        type: "bar",
        name: "recovered",
        data: recover
      }
    ],

    xaxis: {
      categories: dates
    }
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Typography>Portugal</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Chart options={options} series={options.series} />
        </Paper>
      </Grid>
    </Grid>
  );
});

export default SingularCountryPage;
