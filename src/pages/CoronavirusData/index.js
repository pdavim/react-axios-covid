import React from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

//import Material UI
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//import functions
import percentage from "../../functions/percentage";
import totalCases from "../../functions/totalCases";
import filterItems from "../../functions/filterItems";

import Card01 from "../../components/Card01";
import DonutChart01 from "../../components/DonutChart01";
import CityBackdrop from "../../components/CityBackdrop";
import Table01 from "../../components/Table01";
import Table02 from "../../components/Table02";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    //flexGrow: 1,
    margin: 0,
    maxWidth: "100%",
    borderRadius: 7,
    backgroundColor: theme.palette.secondary.dark,
    // height: "100%"
  },
  listOfCities: {
    display: "flex",
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 0,
  },
  table: {
    alignContent: "center",
    alignItems: "center",
    color: "white",
  },
  tableDeath: {
    color: "red",
  },
  tableContainer: {
    maxHeight: 440,
  },
  newCases: {
    color: "orange",
    fontWeight: 900,
  },
  percentage: {
    color: "blue",
    fontWeight: 900,
  },
  recoverd: {
    color: "green",
    fontWeight: 900,
  },
  chartHeader: {
    color: "white",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
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
    borderRadius: 8,
  },
  text: {
    color: "white",
    textAlign: "left",
    fontWeight: 400,
    fontSize: 14,
  },
  topGrid: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  paperGrid: {
    //padding: 1
  },
  paperCardCharts: {
    background: "rgb(32,32,32,0.6)",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 1,
    marginRight: 1,

    //height: 50
  },
  paperCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,255,255,0.1)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard2: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,25,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard3: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(243,186,45,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard4: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(125,11,159,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard5: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,25,255,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard6: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(50,204,100,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard7: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,255,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard8: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(204,102,102,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard9: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,0,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard10: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(150,150,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard11: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(15,15,15,0.4)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  textCard: {
    color: "white",
    fontWeight: 400,
    fontSize: 14,
  },
  textContent: {
    color: "white",
    textAlign: "left",
    fontWeight: 900,
    fontSize: 18,
  },
  paper: {
    position: "absolute",
    // width: 100,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3)
  },
  textChartTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: 900,
    fontSize: 18,
    textTransform: "Capitalize",
  },
  textChartTitlept: {
    textAlign: "center",
    color: "#E1E1E1",
    fontSize: 18,
    fontWeight: 700,
    textTransform: "Capitalize",
    fontStyle: "italic",
  },
}));

const CoronavirusData = inject("Store")(
  observer((props) => {
    // console.log("CoronavirusData page", props);
    let dataData =
      props.Store.getAllCountryCornovirusDataObs.data.countries_stat;
    let totalData = totalCases(dataData);

    let dataDataLength = dataData.length;
    let casesData = totalData.totalCases;
    let deathsData = totalData.totalDeaths;
    let criticalData = totalData.totalCritical;
    let nDeathsData = totalData.tNewDeaths;
    let nCases = totalData.tNewCases;
    let nTotalRecovers = totalData.tRecovers;
    let nActiveCases = totalData.tActiveCases;
    let ntdeaths_per_1m_population = (
      totalData.tdeaths_per_1m_population / dataDataLength
    ).toFixed(2);
    let nttests_per_1m_population = (
      totalData.ttests_per_1m_population / dataDataLength
    ).toFixed(2);
    let nttotal_tests = totalData.ttotal_tests;
    let nTotalCountries = dataData.length;
    let nTotalCasesPer1mPopulation = (
      totalData.tTotalCasesPer1mPopulation / dataDataLength
    ).toFixed(2);

    let totalPercentage = percentage(casesData, deathsData);

    let p = parseFloat(deathsData);
    let q = parseFloat(totalData.totalCases);
    let r = parseFloat(criticalData);

    const seriesDonut = [q, r, p];
    const donuntSeries = [q, p];
    const donuntSeriesCritical = [p, r];
    const donuntSeriesCasesCritical = [q, r];
    const classes = useStyles();

    return (
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="World Cases / Total de Casos:"
            textContent={totalData.totalCases}
            background="rgb(255,255,255,0.1)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="World Deaths / Total de Mortes:"
            textContent={totalData.totalDeaths}
            background="rgb(255,25,25,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="World Death % / Total de Mortes %:"
            textContent={totalPercentage}
            background="rgb(243,186,45,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Daily Death / Mortes Diárias:"
            textContent={nDeathsData}
            background="rgb(125,11,159,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Daily New Cases / Novos Casos Dia:"
            textContent={nCases}
            background="rgb(25,25,255,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Total Recoverd / Total Recuperados:"
            textContent={nTotalRecovers}
            background="rgb(25,255,25,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Active Cases / Casos Activos:"
            textContent={nActiveCases}
            background="rgb(204,102,102,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Cases per 1 milion / Casos por 1 milhão:"
            textContent={nTotalCasesPer1mPopulation}
            background="rgb(255,0,150,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Critical Cases / Casos Criticos:"
            textContent={criticalData}
            background="rgb(50,204,100,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Deaths per 1M / Mortes por Milhão"
            textContent={ntdeaths_per_1m_population}
            background="rgb(243,204,13,0.5)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Tests per 1M / Testes por Milhão"
            textContent={nttests_per_1m_population}
            background="rgb(223,5,5,0.6)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Total Tests / Total de Testes"
            textContent={nttotal_tests}
            background="rgb(213,84,100,0.6)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard=" Num. of Countries / Num. de Países:"
            textContent={nTotalCountries}
            background="rgb(150,150,150,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Card01
            textCard="Last Update / última Actualização:"
            textContent={props.Store.updateDateObs}
            background="rgb(15,15,15,0.4)"
          />
        </Grid>

        <Grid container className={classes.topGrid} spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.paperCardCharts}>
              <Grid item>
                <Typography className={classes.textChartTitle}>
                  Global Data
                </Typography>
                <Typography className={classes.textChartTitlept}>
                  Totais Mundiais
                </Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DonutChart01
              options={optionsDonut}
              series={donuntSeries}
              headerText="Cases/Deaths"
              subheaderText="Casos/Mortes"
              headertextColor="white"
              subheadertextColor="white"
              backgroundChart01="rgb(32,32,32,0.6)"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DonutChart01
              options={optionsDonutCritical}
              series={donuntSeriesCritical}
              headerText="Critical/Deaths"
              subheaderText="Criticos/Mortes"
              headertextColor="white"
              subheadertextColor="white"
              backgroundChart01="rgb(32,32,32,0.6)"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DonutChart01
              options={optionsDonutCasesCritical}
              series={donuntSeriesCasesCritical}
              headerText="Critical/Cases"
              subheaderText="Criticos/Casos"
              headertextColor="white"
              subheadertextColor="white"
              backgroundChart01="rgb(32,32,32,0.6)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DonutChart01
              options={optionsDonutSeries}
              series={seriesDonut}
              headerText="Critical/Death/Cases"
              subheaderText="Criticos/Mortes/Casos"
              headertextColor="white"
              subheadertextColor="white"
              backgroundChart01="rgb(32,32,32,0.6)"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paperCardCharts}>
              <Typography className={classes.textChartTitle}>
                Data per Country
              </Typography>
              <Typography className={classes.textChartTitlept}>
                Dados por país
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.table} xs={12}>
            <Table02 />
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paperCard}>
                <Typography className={classes.textCard}>
                  Last Updated:
                </Typography>

                <Typography className={classes.textContent}>
                  {props.Store.updateDateObs}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paperCard}>
                <Grid item>
                  <Typography className={classes.textCard}>Legenda:</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textContent}>
                    C/D % - Cases / Death %
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  })
);

export default CoronavirusData;

CoronavirusData.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// Charts Stylling ApexCharts
const optionsDonut = {
  chart: {
    id: "donut",
  },
  fill: {
    colors: ["#EB5736", "#d50000"],
  },
  legend: {
    show: false,
  },

  plotOptions: {
    pie: {
      expandOnClick: true,
      customScale: 1,
      donut: {
        size: "55%",

        labels: {
          show: true,
          fill: ["#d50000", "#F8BC36"],
          name: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "white",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "18px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 900,
            color: "red",
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },

          total: {
            show: false,
            showAlways: false,
            label: "Total",
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "#373d3f",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
  },

  labels: ["Total Cases", "Dead"],
};

const optionsDonutCritical = {
  chart: {
    id: "donut",
  },
  fill: {
    colors: ["#d50000", "#552946"],
  },
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
      customScale: 1,
      donut: {
        size: "55%",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "white",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "18px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 900,
            color: "red",
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },

          total: {
            show: false,
            showAlways: false,
            label: "Total",
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "#373d3f",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
  },

  labels: ["Dead", "Critical Cases"],
};

const optionsDonutCasesCritical = {
  chart: {
    id: "donut",
  },
  fill: {
    colors: ["#EB5736", "#552946"],
  },
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
      customScale: 1,
      donut: {
        size: "55%",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "white",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "18px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 900,
            color: "red",
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },

          total: {
            show: false,
            showAlways: false,
            label: "Total",
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "#373d3f",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
  },

  labels: ["Total Cases", "Critical Cases"],
};

const optionsDonutSeries = {
  chart: {
    id: "donut",
  },
  fill: {
    colors: ["#EB5736", "#562846", "#d50000"],
  },
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
      customScale: 1,
      donut: {
        size: "55%",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "white",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "18px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 900,
            color: "red",
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },

          total: {
            show: false,
            showAlways: false,
            label: "Total",
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "#373d3f",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
  },

  labels: ["Total Cases", "Critical Cases", "Dead"],
};
