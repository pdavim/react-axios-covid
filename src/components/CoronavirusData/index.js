import React, { Fragment } from "react";
import { observer, inject } from "mobx-react";
import axios from "axios";
import Chart from "react-apexcharts";
import { getCode } from "country-list";
//Material UI
import { Grid, Card, CardHeader } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//import MapChart from "./MapChart";
//import api from "../../api/api";
//import fetchUrlData from "../../functions/fetchUrlData";

import CoronaVirusDataPT from "../../assets/data/coronaVirusData";
import DeathCounter from "../DeathCounter";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 20,
    //flexGrow: 1,
    margin: 0,
    maxWidth: "100%",
    borderRadius: 7,
    backgroundColor: theme.palette.secondary.dark
    // height: "100%"
  },
  listOfCities: {
    display: "flex",
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 0
  },
  table: {
    alignContent: "center",
    alignItems: "center",
    color: "white"
  },
  tableDeath: {
    color: "red"
  },
  newCases: {
    color: "orange",
    fontWeight: 900
  },
  percentage: {
    color: "blue",
    fontWeight: 900
  },
  recoverd: {
    color: "green",
    fontWeight: 900
  },
  chartHeader: {
    color: "white",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10
  },
  chart: {
    color: "white"
  },
  text: {
    color: "white",
    textAlign: "left",
    fontWeight: 400,
    fontSize: 14
  },
  topGrid: {
    paddingTop: 20,
    paddingBottom: 20
  },
  paperCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,255,255,0.05)",
    marginLeft: 3,
    marginRight: 3
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
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "rgb(0,0,0,0.1)",
    color: theme.palette.secondary.dark
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);
const CoronavirusData = inject("Store")(
  observer(props => {
    //console.log("coronavirus componet ", props.Store.dieCalTimeStore);

    let countriesArray = [];
    let countriesIdArray = [];
    let dataLength = props.Store;
    let data;
    let isLoading;
    let deathPerSecond;
    //console.log("dataLength ", typeof dataLength);
    //console.log("data ", props.Store.getCoronaVirusDataArray);
    if (!props.Store.getCoronaVirusDataArray) {
      console.log("wait a little more for data");
      return;
    } else {
      //console.log("Data Has Arrived");
      data = props.Store.getCoronaVirusDataArray.data.countries_stat;

      const countriesFunction = async () => {
        for (let i = 0; i < data.length; i++) {
          let country = await props.Store.getCoronaVirusDataArray.data
            .countries_stat[i].country_name;
          countriesArray.push(country.toLocaleLowerCase());
        }
      };

      const countriesIdFunction = async () => {
        await countriesFunction();
        for (let i = 0; i < countriesArray.length; i++) {
          let id = getCode(countriesArray[i]);
          countriesIdArray.push(id);
          //console.log("x", props);
        }
        isLoading = false;
      };

      countriesIdFunction();
    }

    //const { errorOnRequest, fetchCityWeather, getWeatherData } = props.Store;

    //console.log("countriesArray ", countriesArray);

    // console.log("countriesIdArray ", countriesIdArray);

    //console.log("x", CoronaVirusDataPT);

    // let data = props.Store.getCoronaVirusDataArray.data.countries_stat;

    const percentage = (a, b) => {
      let f = checkIfNumber(a);
      let g = checkIfNumber(b);
      let c = (g * 100) / f;
      let h = c.toFixed(2);
      return h;
    };

    const checkIfNumber = e => {
      if (typeof e === "number") {
        return e;
      } else {
        let b = parseFloat(e.replace(/,/g, ""));
        return b;
      }
    };

    const totalCases = () => {
      let totalCases = 0;
      let totalDeaths = 0;
      let totalCritical = 0;
      let tNewDeaths = 0;
      let tNewCases = 0;
      let i = 0;
      // console.log("Data length", data);

      for (i = 0; i < data.length; i++) {
        let x = checkIfNumber(data[i].cases);
        let y = checkIfNumber(data[i].deaths);
        let z = checkIfNumber(data[i].serious_critical);
        let newDeaths = checkIfNumber(data[i].new_deaths);
        let newCases = checkIfNumber(data[i].new_cases);
        totalCases = totalCases + x;
        totalDeaths = totalDeaths + y;
        totalCritical = totalCritical + z;
        tNewDeaths = tNewDeaths + newDeaths;
        tNewCases = tNewCases + newCases;
        // console.log("data ", totalCases);
        //return { totalCases, totalDeaths };
      }
      return { totalCases, totalDeaths, totalCritical, tNewDeaths, tNewCases };
    };
    let totalData = totalCases();
    // console.log("totalCases ", totalData);
    let casesData = totalData.totalCases;
    let deathsData = totalData.totalDeaths;
    let criticalData = totalData.totalCritical;
    let nDeathsData = totalData.tNewDeaths;
    let nCases = totalData.tNewCases;

    const deathCounter = () => {
      const dailyMinutes = 24;
      let a = props.Store.deathCounter;
      let deathPerSecondData = nDeathsData / dailyMinutes;
      a = deathPerSecondData;
      deathPerSecond = a;
      // console.log("death per second ", deathPerSecond);
    };

    deathCounter();

    // console.log("casesData ", casesData);
    // console.log("deathsData ", deathsData);

    let totalPercentage = percentage(casesData, deathsData);
    let timeUpdated =
      props.Store.getCoronaVirusDataArray.data.statistic_taken_at;

    axios({
      method: "GET",
      url: "https://countries-cities.p.rapidapi.com/location/country/GB",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "countries-cities.p.rapidapi.com",
        "x-rapidapi-key": "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df"
      },
      params: {
        format: "json"
      }
    })
      .then(response => {
        //console.log("countries info", response.data);
        //console.log("countries capital info", response.data.capital);
      })
      .catch(error => {
        console.log(error);
      });

    //CoronavirusData;

    const optionsDonut = {
      chart: {
        id: "donut"
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          size: 200,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "white",
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: "18px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                color: "red",
                offsetY: 16,
                formatter: function(val) {
                  return val;
                }
              },

              total: {
                show: false,
                showAlways: false,
                label: "Total",
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#373d3f",
                formatter: function(w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                }
              }
            }
          }
        }
      },

      labels: ["% Death", "Total Cases"]
    };

    const optionsDonutCritical = {
      chart: {
        id: "donut"
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          size: 200,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "white",
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: "18px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                color: "red",
                offsetY: 16,
                formatter: function(val) {
                  return val;
                }
              },

              total: {
                show: false,
                showAlways: false,
                label: "Total",
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#373d3f",
                formatter: function(w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                }
              }
            }
          }
        }
      },

      labels: ["% Death", "Critical Cases"]
    };

    const options = {
      chart: {
        id: "basic-bar"
      },

      theme: {
        //mode: "dark",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "black",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ccc"
          }
        }
      },
      colors: ["#546E7A", "#E91E63"],
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "flat",
          columnWidth: "40%",
          barHeight: "70%",
          distributed: false,
          colors: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: undefined
              }
            ],
            backgroundBarColors: [],
            backgroundBarOpacity: 1
          },
          dataLabels: {
            position: "top",
            maxItems: 100,
            hideOverflowingLabels: true,
            orientation: "horizontal"
          }
        }
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        theme: true,
        style: {
          fontSize: "12px",
          fontFamily: undefined
        },
        onDatasetHover: {
          highlightDataSeries: true
        },
        x: {
          show: true,
          format: "dd MMM",
          formatter: undefined
        },
        y: {
          formatter: undefined,
          title: {
            formatter: seriesName => seriesName
          }
        },
        z: {
          formatter: undefined,
          title: "Size: "
        },
        marker: {
          show: true
        },
        items: {
          display: "flex"
        },
        fixed: {
          enabled: false,
          position: "topRight",
          offsetX: 0,
          offsetY: 0
        }
      }
    };
    const series = [
      {
        name: ["Cases", "Critical", "Deaths"],
        data: [
          parseFloat(totalData.totalCases),
          parseFloat(criticalData),
          parseFloat(deathsData)
        ]
      }
    ];

    let p = parseFloat(deathsData);
    let q = parseFloat(totalData.totalCases);
    let r = parseFloat(criticalData);

    const donuntSeries = [p, q];
    const donuntSeriesCritical = [p, r];
    const classes = useStyles();
    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid container>
          <Grid item xs={4}>
            <Paper className={classes.paperCard}>
              <Grid item>
                <Typography className={classes.textCard}>
                  World Cases:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textContent}>
                  {totalData.totalCases}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paperCard}>
              <Grid item>
                <Typography className={classes.textCard}>
                  World Deaths:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textContent}>
                  {totalData.totalDeaths}
                </Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paperCard}>
              <Grid item>
                <Typography className={classes.textCard}>
                  World Death %:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textContent}>
                  {totalPercentage}
                </Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paperCard}>
              <Grid item>
                <Typography className={classes.textCard}>
                  Daily Death:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textContent}>
                  {nDeathsData}
                </Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paperCard}>
              <Grid item>
                <Typography className={classes.textCard}>
                  Daily New Cases:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textContent}>
                  {nCases}
                </Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paperCard}>
              <Grid item>
                <Typography className={classes.textCard}>
                  Daily Death / until now:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textContent}>
                  <DeathCounter props={deathPerSecond} store={props} />
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.topGrid}>
          <Grid item xs={4} className={classes.chart}>
            <Typography className={classes.chartHeader}>
              Cases & Deaths
              <br />
              from coronavirus
            </Typography>
            <Chart
              options={optionsDonut}
              type="donut"
              series={donuntSeries}
              className={classes.chart}
            />
          </Grid>
          <Grid item xs={4} className={classes.chart}>
            <Typography className={classes.chartHeader}>
              Critical Cases & Deaths
              <br />
              from coronavirus
            </Typography>
            <Chart
              options={optionsDonutCritical}
              type="donut"
              series={donuntSeriesCritical}
              className={classes.chart}
            />
          </Grid>

          <Grid item xs={4} className={classes.chart}>
            <Typography className={classes.chartHeader}>
              Cases & Deaths
              <br />
              from coronavirus
            </Typography>
            <Chart
              options={options}
              type="bar"
              series={series}
              className={classes.chart}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.table} xs={12}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>NÂº</StyledTableCell>
                  <StyledTableCell>Country</StyledTableCell>
                  <StyledTableCell align="right">Cases</StyledTableCell>
                  <StyledTableCell align="right">Deaths</StyledTableCell>
                  <StyledTableCell align="right">
                    Total Recoverd
                  </StyledTableCell>
                  <StyledTableCell align="right">New Deaths</StyledTableCell>
                  <StyledTableCell align="right">New Cases</StyledTableCell>
                  <StyledTableCell align="right">
                    Critical Cases
                  </StyledTableCell>
                  <StyledTableCell align="right">C/D %</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((dt, i) => (
                  <StyledTableRow key={i}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dt.country_name}
                    </TableCell>

                    <TableCell align="right">{dt.cases}</TableCell>
                    <TableCell align="right" className={classes.tableDeath}>
                      {dt.deaths}
                    </TableCell>
                    <TableCell align="right" className={classes.recoverd}>
                      {dt.total_recovered}
                    </TableCell>
                    <TableCell align="right" className={classes.tableDeath}>
                      {dt.new_deaths}
                    </TableCell>
                    <TableCell align="right" className={classes.newCases}>
                      {dt.new_cases}
                    </TableCell>
                    <TableCell align="right">{dt.serious_critical}</TableCell>
                    <TableCell align="right" className={classes.percentage}>
                      {percentage(dt.cases, dt.deaths)}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container>
            <Grid item xs={4}>
              <Paper className={classes.paperCard}>
                <Grid item>
                  <Typography className={classes.textCard}>
                    Last Updated:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textContent}>
                    {timeUpdated}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={4}>
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
