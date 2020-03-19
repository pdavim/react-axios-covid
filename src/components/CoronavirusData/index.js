import React from "react";
import { observer, inject } from "mobx-react";

import Chart from "react-apexcharts";
import { getCode } from "country-list";
//Material UI
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//import MapChart from "./MapChart";
//import api from "../../api/api";
//import fetchUrlData from "../../functions/fetchUrlData";

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
  paperGrid: {
    //padding: 1
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
    background: "rgb(25,25,25,0.3)",
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
    background: "rgb(150,150,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
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
  paper: {
    position: "absolute",
    // width: 100,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5]
    // padding: theme.spacing(2, 4, 3)
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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const CoronavirusData = inject("Store")(
  observer(props => {
    //console.log("coronavirus componet ", props.Store.dieCalTimeStore);
    console.log("CoronavirusData props ", props);
    let countriesArray = [];
    let countriesIdArray = [];

    let data;

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
        //isLoading = false;
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
      let tRecovers = 0;
      let tActiveCases = 0;
      let tTotalCasesPer1mPopulation = 0;

      let i = 0;
      //console.log("Data length", data);

      for (i = 0; i < data.length; i++) {
        //total cases
        let x = checkIfNumber(data[i].cases);

        totalCases = totalCases + x;
        //total deaths
        let y = checkIfNumber(data[i].deaths);
        totalDeaths = totalDeaths + y;

        // total critical
        let z = checkIfNumber(data[i].serious_critical);
        totalCritical = totalCritical + z;

        //Total recovered
        //let w = checkIfNumber(data[i].total_recovered);
        let totalRecover = checkIfNumber(data[i].total_recovered);
        tRecovers = tRecovers + totalRecover;

        //new deaths
        let newDeaths = checkIfNumber(data[i].new_deaths);
        tNewDeaths = tNewDeaths + newDeaths;

        //new cases
        let newCases = checkIfNumber(data[i].new_cases);
        tNewCases = tNewCases + newCases;

        //active_cases
        let activeCases = checkIfNumber(data[i].active_cases);
        tActiveCases = tActiveCases + activeCases;

        // total total_cases_per_1m_population
        let totalCasesPer1mPopulation = checkIfNumber(
          data[i].total_cases_per_1m_population
        );
        tTotalCasesPer1mPopulation =
          tTotalCasesPer1mPopulation + totalCasesPer1mPopulation;
      }
      return {
        totalCases,
        totalDeaths,
        totalCritical,
        tNewDeaths,
        tNewCases,
        tRecovers,
        tActiveCases,
        tTotalCasesPer1mPopulation
      };
    };
    let totalData = totalCases();
    console.log("totalCases ", totalData);
    let dataData = props.Store.getCoronaVirusDataArray.data.countries_stat;
    let dataDataLength = dataData.length;
    let casesData = totalData.totalCases;
    let deathsData = totalData.totalDeaths;
    let criticalData = totalData.totalCritical;
    let nDeathsData = totalData.tNewDeaths;
    let nCases = totalData.tNewCases;
    let nTotalRecovers = totalData.tRecovers;
    let nActiveCases = totalData.tActiveCases;
    let nTotalCasesPer1mPopulation = (
      totalData.tTotalCasesPer1mPopulation / dataDataLength
    ).toFixed(2);

    // console.log("casesData ", casesData);
    // console.log("deathsData ", deathsData);

    let totalPercentage = percentage(casesData, deathsData);
    let timeUpdated =
      props.Store.getCoronaVirusDataArray.data.statistic_taken_at;

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

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      console.log(open);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard}>
            <Grid item>
              <Typography className={classes.textCard}>World Cases:</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textContent}>
                {totalData.totalCases}
              </Typography>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard2}>
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

        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard3}>
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

        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard4}>
            <Grid item>
              <Typography className={classes.textCard}>Daily Death:</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textContent}>
                {nDeathsData}
              </Typography>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard5}>
            <Grid item>
              <Typography className={classes.textCard}>
                Daily New Cases:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textContent}>{nCases}</Typography>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard7}>
            <Grid item>
              <Typography className={classes.textCard}>
                Total Recoverd:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textContent}>
                {nTotalRecovers}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard8}>
            <Grid item>
              <Typography className={classes.textCard}>
                Active Cases:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textContent}>
                {nActiveCases}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard9}>
            <Grid item>
              <Typography className={classes.textCard}>
                Cases per 1 milion:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textContent}>
                {nTotalCasesPer1mPopulation}
              </Typography>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={4} className={classes.paperGrid}>
          <Paper className={classes.paperCard6}>
            <Grid item>
              <Typography className={classes.textCard}>Last Update:</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textContent}>
                {timeUpdated}
              </Typography>
            </Grid>
          </Paper>
        </Grid>

        <Grid container className={classes.topGrid}>
          <Grid xs={12} sm={6} md={4} className={classes.chart}>
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
          <Grid item xs={12} sm={6} md={4} className={classes.chart}>
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

          <Grid item xs={12} sm={6} md={4} className={classes.chart}>
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
                  <StyledTableCell>Nº</StyledTableCell>
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
                    <TableCell align="right" className={classes.percentage}>
                      <button type="button" onClick={handleOpen}>
                        Open Modal
                      </button>
                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        //open={open}
                        //onClose={handleClose}
                      >
                        <div className={classes.paper}>
                          <h2 id="simple-modal-title">Text in a modal</h2>
                          <p id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                          </p>
                          <CoronavirusData />
                        </div>
                      </Modal>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container>
            <Grid item xs={12} sm={6}>
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
