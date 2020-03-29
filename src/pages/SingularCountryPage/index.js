import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import Chart from "react-apexcharts";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";

//import Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
import { isObject, isArray } from "util";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";

//import functions
import percentage from "../../functions/percentage";
import SingularCountryMap from "./SIngularCountryMap";
import Card01 from "../../components/Card01";
import LineChart01 from "../../components/LineChart01";
import BarChart01 from "../../components/BarChart01";

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
  },
  titleChartOverWhite: {
    color: "black",
    textAlign: "left",
    fontWeight: 700,
    fontSize: 22,
    padding: 20
  },
  TableFooterRegion: {
    paddingTop: 14,
    paddingBottom: 14
  }
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const SingularCountryPage = inject("Store")(
  observer((props, getData) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const fg = () => {
      console.log("fg props ", getData);
      // props.Store.getData();
      console.log("fg get ", props.Store.portugalCovidNationalDataInfo);
      return;
    };
    if (props.Store.portugalCovidNationalDataInfo !== isArray) {
      setTimeout(fg(), 2000);
    }
    console.log("SingularCountryPage info store data", props.Store);
    console.log(
      "SingularCountryPage Region Cases",
      props.Store.portugalCovidNationalDataInfo[0].casesLocationRegion
        .regionCases
    );
    console.log(
      "SingularCountryPage singleCountryDataStore",
      props.Store.singleCountryDataStore
    );

    let arraylengthAutorun = props.Store.singleCountryDataStore;
    if (arraylengthAutorun.length === 0) {
      console.log("await for data");
      setTimeout(console.log("Now"), 2000);
      return;
    } else {
      //console.log(typeof f);
      //console.log("Singular page props ", props.Store.citiesDataArrayObs);
      console.log("data has arrived");
      console.log(arraylengthAutorun);
    }
    //console.log("single country  ", singleCountry);
    //console.log("single country data ", singleDataCountry);

    let ageChartsGender = [];
    let casesAgeMale = [];
    let casesAgeFemale = [];
    let deadAgeMale = [];
    let deadAgeFemale = [];

    for (let i = 0; i < 9; i++) {
      deadAgeMale.push(
        props.Store.portugalCovidNationalDataInfo[0].deaths.age.male[i]
      );
    }
    for (let i = 0; i < 9; i++) {
      deadAgeFemale.push(
        props.Store.portugalCovidNationalDataInfo[0].deaths.age.female[i]
      );
    }

    //let maleGenderArray = props.Store.singleCountryDataStore.cases;
    for (let i = 0; i < 9; i++) {
      casesAgeMale.push(
        props.Store.portugalCovidNationalDataInfo[0].cases.age.male[i]
      );
    }
    for (let i = 0; i < 9; i++) {
      casesAgeFemale.push(
        props.Store.portugalCovidNationalDataInfo[0].cases.age.female[i]
      );
    }
    for (let i = 0; i < 9; i++) {
      ageChartsGender.push(
        props.Store.portugalCovidNationalDataInfo[0].cases.age.headerAge[i]
      );
    }
    let importedCases =
      props.Store.portugalCovidNationalDataInfo[0].importedCases;
    let casesPerRegion =
      props.Store.portugalCovidNationalDataInfo[0].casesLocationRegion
        .regionCases;

    //console.log("ageChartsGender ", casesAgeMale);
    //console.log("ageChartsGender ", casesAgeFemale);
    //console.log("ageChartsGender ", ageChartsGender);
    //single data country
    let datesArray = props.headers[0];
    let confirmedArray = props.confirmed[0];
    console.log("datesArray ", props);
    const { headers, confirmed, dead, recovered } = props;
    if (
      headers.length === 0 ||
      confirmed.length === 0 ||
      dead.length === 0 ||
      recovered.length === 0
    ) {
      console.log("array empty");
      props.Store.getData();
      return;
    }
    console.log("getData props ", props);
    let datesArrayLength = datesArray.length;
    let dates = datesArray.slice(5, datesArrayLength);

    console.log("getData confirmedArray ", confirmedArray);
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
    //let coordinates = props.Store.getSingleCountryInfoSTORE[0].coordinates;
    let population = props.Store.getSingleCountryInfo[0].population;
    //let region = props.Store.getSingleCountryInfoSTORE[0].region;
    //let capital = props.Store.getSingleCountryInfoSTORE[0].capital;
    let deathPercentage = percentage(cases, deaths);
    let casesprobablilityPercentage = percentage(population, cases);
    let casesprobablilityNumber = (
      casesprobablilityPercentage * population
    ).toFixed(0);
    let probalilityDeathNumber = (
      (casesprobablilityNumber * deathPercentage) /
      100
    ).toFixed(0);
    //console.log("Header are ", dates);
    //console.log("Confirm are ", confirm);
    //console.log("Died are ", died);

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
          type: "line",
          name: "casos",
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
          type: "line",
          name: "Mortos",
          data: died
        }
      ],

      xaxis: {
        categories: dates
      }
    };

    let optionsRecovered = {
      chart: {
        type: "line"
      },
      series: [
        {
          type: "line",
          name: "Recuperados",
          data: recover
        }
      ],

      xaxis: {
        categories: dates
      }
    };

    let optionsGender = {
      chart: {
        type: "line"
      },
      colors: ["#0E22FB", "#E722FB"],
      series: [
        {
          type: "column",
          name: "Male",
          data: casesAgeMale
        },
        {
          type: "column",
          name: "Female",
          data: casesAgeFemale
        }
      ],

      xaxis: {
        categories: ageChartsGender
      }
    };

    let optionsGenderDead = {
      chart: {
        type: "line"
      },
      colors: ["#0E22FB", "#E722FB"],
      series: [
        {
          type: "column",
          name: "Male",
          data: deadAgeMale
        },
        {
          type: "column",
          name: "Female",
          data: deadAgeFemale
        }
      ],

      xaxis: {
        categories: ageChartsGender
      }
    };

    // console.log("CoronavirusData props", props);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
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
          <Card01
            textCard="Total de casos"
            textContent={cases}
            background="rgb(255,255,255,0.1)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Total de Mortes"
            textContent={deaths}
            background="rgb(255,25,25,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Total de recuperados"
            textContent={total_recovered}
            background="rgb(243,186,45,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Taxa de Mortalidade %"
            textContent={deathPercentage}
            textAfterContentSymbol=" %"
            background="rgb(125,11,159,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Casos por Milhão"
            textContent={total_cases_per_1m_population}
            background="rgb(25,25,255,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Casos Activos"
            textContent={active_cases}
            background="rgb(50,204,100,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Casos Criticos"
            textContent={serious_critical}
            background="rgb(25,255,25,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Casos Novos"
            textContent={new_cases}
            background="rgb(204,102,102,0.3)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Novas Mortes"
            textContent={new_deaths}
            background="rgb(255,0,150,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Probabilidades de casos"
            textContent={casesprobablilityNumber}
            textContentdivider=" / "
            textAfterContent={casesprobablilityPercentage}
            textAfterContentSymbol=" %"
            background="rgb(150,150,150,0.3)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="Probabilidades nº de mortes"
            textContent={probalilityDeathNumber}
            background="rgb(15,15,15,0.4)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card01
            textCard="População"
            textContent={population}
            background="rgb(15,65,15,0.4)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LineChart01
            options={options}
            series={optionsDead.series}
            headerText="Evolução da"
            subheaderText="Mortalidade"
            backgroundLineChart01="white"
            headertextColor="black"
            subheadertextColor="black"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LineChart01
            options={options}
            series={options.series}
            headerText="Evolução de"
            subheaderText="Casos"
            backgroundLineChart01="white"
            headertextColor="black"
            subheadertextColor="black"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LineChart01
            options={options}
            series={optionsRecovered.series}
            headerText="Evolução de"
            subheaderText="Recuperados"
            backgroundLineChart01="white"
            headertextColor="black"
            subheadertextColor="black"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <BarChart01
            options={optionsGender}
            series={optionsGender.series}
            headerText="Casos por"
            subheaderText="Género e Idade"
            backgroundLineChart01="white"
            headertextColor="black"
            subheadertextColor="black"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BarChart01
            options={optionsGenderDead}
            series={optionsGenderDead.series}
            headerText="Mortes por"
            subheaderText="Género e Idade"
            backgroundLineChart01="white"
            headertextColor="black"
            subheadertextColor="black"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper>
            <Typography className={classes.titleChartOverWhite}>
              Casos Importados
            </Typography>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
              aria-label="sticky table"
            >
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>País</TableCell>
                    <TableCell align="right">Casos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {importedCases
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => (
                      <TableRow key={i}>
                        <TableCell align="left">{row.country}</TableCell>
                        <TableCell align="right">{row.cases}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                {importedCases.length === 0 ? (
                  <p>loading pages</p>
                ) : (
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[7, 10, 15, 20, 50]}
                        //component="div"
                        count={importedCases.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Paper>
            <Typography className={classes.titleChartOverWhite}>
              Casos Por Região
            </Typography>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="simple table"
                stickyHeader
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Região</TableCell>
                    <TableCell align="right">Casos</TableCell>
                    <TableCell align="right">Mortos</TableCell>
                    <TableCell align="right">Recuperados</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {casesPerRegion.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell align="left">{row.region}</TableCell>
                      <TableCell align="right">{row.cases}</TableCell>
                      <TableCell align="right">{row.dead}</TableCell>
                      <TableCell align="right">{row.recovered}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      align="left"
                      className={classes.TableFooterRegion}
                    >
                      <Typography>Casos por Região</Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    );
  })
);

export default SingularCountryPage;
