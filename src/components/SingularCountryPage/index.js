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
import { isArray, isUndefined, isObject } from "util";

//import functions
import percentage from "../../functions/percentage";
import { string } from "prop-types";
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
  },
  paperCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,255,255,0.1)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard2: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,25,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard3: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(243,186,45,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard4: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(125,11,159,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard5: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,25,255,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard6: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(50,204,100,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard7: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,255,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard8: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(204,102,102,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard9: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,0,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard10: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(150,150,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard11: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(15,15,15,0.4)",
    marginLeft: 1,
    marginRight: 1
    //height: 50
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
  },
  title: {
    color: "white",
    fontWeight: 900,
    fontSize: 18,
    textAlign: "center"
  }
}));

const SingularCountryPage = inject("Store")(
  observer(props => {
    console.log(
      "SingularCountryPage getCoronaVirusDataArray",
      props.Store.getSingleCountryInfo
    );
    console.log(
      "SingularCountryPage singleCountryDataStore",
      props.Store.singleCountryDataStore
    );

    //coordinates country array

    let f = props.Store.getCoronaVirusDataArray;
    let typeF = typeof f;
    console.log(typeof typeF);
    //let fArray = f.length;
    if (typeF !== isObject) {
      console.log("await for data");
      setTimeout(console.log("Now"), 4000);
    } else {
      console.log(typeof f);
      //console.log("Singular page props ", props.Store.citiesDataArrayObs);
      console.log("data has arrived");
    }
    //console.log("single country  ", singleCountry);
    //console.log("single country data ", singleDataCountry);

    //single data country
    let datesArray = props.headers[0];
    let datesArrayLength = datesArray.length;
    let dates = datesArray.slice(5, datesArrayLength);

    let confirmedArray = props.confirmed[0];
    let confirmedArrayLength = confirmedArray.length;
    let confirm = confirmedArray.slice(5, confirmedArrayLength);

    let deadArray = props.dead[0];
    let deadArrayLength = deadArray.length;
    let died = deadArray.slice(5, deadArrayLength);

    let recoveredArray = props.recovered[0];
    let recoveredArrayLength = recoveredArray.length;
    let recover = recoveredArray.slice(5, recoveredArrayLength);

    let country_name = props.Store.singleCountryDataStore[0].country_name;
    let new_deaths = props.Store.singleCountryDataStore[0].new_deaths;
    let new_cases = props.Store.singleCountryDataStore[0].new_cases;
    let total_cases_per_1m_population =
      props.Store.singleCountryDataStore[0].total_cases_per_1m_population;
    let active_cases = props.Store.singleCountryDataStore[0].active_cases;
    let serious_critical =
      props.Store.singleCountryDataStore[0].serious_critical;
    let total_recovered = props.Store.singleCountryDataStore[0].total_recovered;
    let deaths = props.Store.singleCountryDataStore[0].deaths;
    let cases = props.Store.singleCountryDataStore[0].cases;
    let coordinates = props.Store.getSingleCountryInfo[0].coordinates;
    let population = props.Store.getSingleCountryInfo[0].population;
    let region = props.Store.getSingleCountryInfo[0].region;
    let capital = props.Store.getSingleCountryInfo[0].capital;
    let deathPercentage = percentage(cases, deaths);
    let casesprobablilityPercentage = percentage(population, cases);
    let casesprobablilityNumber = (
      casesprobablilityPercentage * population
    ).toFixed(0);
    let probalilityDeathNumber = (
      (casesprobablilityNumber * deathPercentage) /
      100
    ).toFixed(0);
    // console.log("Header are ", dates);
    // console.log("Confirm are ", confirm);
    // console.log("Died are ", died);

    let options = {
      chart: {
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#247BA0"],
      stroke: {
        curve: "smooth"
      },
      markers: {
        size: 1
      },
      series: [
        {
          type: "bar",
          name: "cases",
          data: confirm
        }
      ],

      xaxis: {
        categories: dates
      }
    };

    let optionsDead = {
      chart: {
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#FF1654"],
      stroke: {
        curve: "smooth"
      },
      markers: {
        size: 1
      },
      series: [
        {
          type: "bar",
          name: "dead",
          data: died
        }
      ],

      xaxis: {
        categories: dates
      }
    };

    let optionsRecovered = {
      chart: {
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#24A34E"],
      stroke: {
        curve: "smooth"
      },
      markers: {
        size: 1
      },
      series: [
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
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paperCard11}>
            <Typography className={classes.title}>{country_name}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard}>
            <Typography className={classes.textCard}>Total de casos</Typography>
            <Typography className={classes.textContent}>{cases}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard2}>
            <Typography className={classes.textCard}>
              Total de Mortes
            </Typography>
            <Typography className={classes.textContent}>{deaths}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard3}>
            <Typography className={classes.textCard}>
              Total de recuperados
            </Typography>
            <Typography className={classes.textContent}>
              {total_recovered}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard4}>
            <Typography className={classes.textCard}>
              Taxa de Mortalidade %
            </Typography>
            <Typography className={classes.textContent}>
              {deathPercentage}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard5}>
            <Typography className={classes.textCard}>
              Casos por Milhão
            </Typography>
            <Typography className={classes.textContent}>
              {total_cases_per_1m_population}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard6}>
            <Typography className={classes.textCard}>Casos Activos</Typography>
            <Typography className={classes.textContent}>
              {active_cases}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard7}>
            <Typography className={classes.textCard}>Casos Criticos</Typography>
            <Typography className={classes.textContent}>
              {serious_critical}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard8}>
            <Typography className={classes.textCard}>Casos Novos</Typography>
            <Typography className={classes.textContent}>{new_cases}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard9}>
            <Typography className={classes.textCard}>Novas Mortes</Typography>
            <Typography className={classes.textContent}>
              {new_deaths}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard10}>
            <Typography className={classes.textCard}>
              Probabilidades de casos
            </Typography>
            <Typography className={classes.textContent}>
              {casesprobablilityNumber} / {casesprobablilityPercentage}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard10}>
            <Typography className={classes.textCard}>
              Probabilidades nº de mortes
            </Typography>
            <Typography className={classes.textContent}>
              {probalilityDeathNumber}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paperCard10}>
            <Typography className={classes.textCard}>População</Typography>
            <Typography className={classes.textContent}>
              {population}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Paper>
            <Typography>Casos</Typography>
            <Chart options={options} series={options.series} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper>
            <Typography>Mortos</Typography>
            <Chart options={options} series={optionsDead.series} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper>
            <Typography>Recuperados</Typography>
            <Chart options={options} series={optionsRecovered.series} />
          </Paper>
        </Grid>
      </Grid>
    );
  })
);

export default SingularCountryPage;
