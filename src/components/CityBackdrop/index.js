import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { observer, inject } from "mobx-react";
import { Grid, Paper } from "@material-ui/core";

import Card01 from "../Card01";
import Card01Title from "../Card01Title";
import Map01 from "../Map01";
import LineChart from "../LineChart01";

import filterItems from "../../functions/filterItems";
import percentage from "../../functions/percentage";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  gridContainerRoot: {
    padding: 20,
    height: "100%",
    display: "flex",
    alignContent: "flex-start"
  },
  paper: {
    height: "100%",
    background: "rgb(10,10,10,0.7)"
  }
}));

const CityBackdrop = props => {
  console.log(
    "CityBackdrop props All dead",
    props.Store.AlldeathPerCountryArray
  );
  /* console.log(
    "CityBackdrop props all recoverd",
    props.Store.AllrecoverdPerCountry
  );
  console.log(
    "CityBackdrop props all confirmed",
    props.Store.AllconfirmedPerCountry
  ); */
  const classes = useStyles();
  const [arrayData, setArrayData] = React.useState([]);
  const [deathData, setDeathData] = React.useState([]);
  const [casesData, setCasesData] = React.useState([]);
  const [recoveryData, setRecoveryData] = React.useState([]);
  const [locationData, setLocation] = React.useState([]);
  const [
    recoveredHistoricalState,
    setrecoveredHistoricalState
  ] = React.useState([]);
  const [deadHistoricalState, setdeadHistoricalState] = React.useState([]);
  const [headerHistoricalState, setheaderHistoricalState] = React.useState([]);
  const [
    confirmedHistoricalState,
    setconfirmedHistoricalState
  ] = React.useState([]);
  //const [arraCountr, setArrayCountrt] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);

  const percentageData = () => {
    let deathPercentage = percentage(props.cases, props.deaths);
    let casesprobablilityPercentage = percentage(
      arrayData[0].population,
      props.cases
    );
    let casesprobablilityNumber = (
      casesprobablilityPercentage * arrayData[0].population
    ).toFixed(0);
    let probalilityDeathNumber = (
      (casesprobablilityNumber * deathPercentage) /
      100
    ).toFixed(0);
  };

  const getHistoricalData = async value => {
    let deadArray = await props.Store.AlldeathPerCountryArray;
    //let deadArrayLength = deadArray.length;
    //let died = deadArray.slice(5, deadArrayLength);

    let recoveredArray = await props.Store.AllrecoverdPerCountry;
    //let recoveredArrayLength = recoveredArray.length;
    //let recover = recoveredArray.slice(5, recoveredArrayLength);
    let confirmedArray = await props.Store.AllconfirmedPerCountry;
    //let confirmedArrayLength = confirmedArray.length;
    //   let confirm = confirmedArray.slice(5, confirmedArrayLength);
    //this.headersArrayCountry
    let arrayHeadersHistorical = await props.Store.headersArrayCountry;

    let arrayTest = ["oprtugal", "Portugal", "aveiro"];
    const filterItemsCountryHistorical = (arr, query) => {
      let queryLower = query.toLowerCase();
      //console.log("queryLower", queryLower);
      let dataCountryCovid = arr.filter(item => item[1] === query);
      return dataCountryCovid;
    };

    let dataCountryHistoricalConfirmed = filterItemsCountryHistorical(
      confirmedArray,
      value
    );
    let confirmedHistorical = dataCountryHistoricalConfirmed.slice(
      5,
      dataCountryHistoricalConfirmed.length
    );

    let dataCountryHistoricalDead = filterItemsCountryHistorical(
      deadArray,
      value
    );

    let deadHistorical = dataCountryHistoricalDead.slice(
      5,
      dataCountryHistoricalDead.length
    );

    let dataCountryHistoricalRecoverd = filterItemsCountryHistorical(
      recoveredArray,
      value
    );
    let recoveredHistorical = dataCountryHistoricalRecoverd.slice(
      5,
      dataCountryHistoricalRecoverd.length
    );
    let headerHistorical = arrayHeadersHistorical.slice(
      5,
      arrayHeadersHistorical.length
    );
    setheaderHistoricalState(headerHistorical);
    setrecoveredHistoricalState(recoveredHistorical);
    setdeadHistoricalState(deadHistorical);
    setconfirmedHistoricalState(confirmedHistorical);

    //let dataCountryCovid = confirmedArray.filter(item => item[1] === "Portugal");

    console.log("dataCountryCovid", deadHistorical);
  };

  /* 
  console.log(
    "Store CityBackdrop AlldeathPerCountryArray",
    props.Store.AlldeathPerCountryArray
  );
  console.log(
    "Store CityBackdrop AllrecoverdPerCountry",
    props.Store.AllrecoverdPerCountry
  );
  console.log(
    "Store CityBackdrop AllconfirmedPerCountry",
    props.Store.AllconfirmedPerCountry
  );
  console.log(
    "Store CityBackdrop headersArrayCountry",
    props.Store.headersArrayCountry
  ); */

  const handleClose = () => {
    setOpen(false);
    setisLoading(true);
  };
  const handleToggle = async () => {
    // console.log("value", props.value);
    // console.log("value props", props);
    setOpen(!open);
    filterCountry(props.value);
    filterConfirmedCountry(props.value);
    filterDeathCountry(props.value);
    filterRecoverdCountry(props.value);
    await getHistoricalData(props.value);
    //setCoord(props.value);
    setisLoading(false);
  };
  //console.log("cityBackdrop", props.Store.getAllCountryGeneralDataArray[0]);

  const filterCountry = value => {
    if (value === "USA") {
      value = "United States";
    }
    if (value === "S. Korea") {
      value = "South Korea";
    }

    if (value === "Czechia") {
      value = "Czech Republic";
    }
    if (value === "North Macedonia") {
      value = "Republic of Macedonia";
    }
    if (value === "British Virgin Islands") {
      value = "Virgin Islands (British)";
    }
    if (value === "Turks and Caicos Islands") {
      value = "Turks and Caicos Islands";
    }
    if (value === "St. Vincent Grenadines") {
      value = "Saint Vincent and the Grenadines";
    }
    if (value === "UK") {
      value = "United Kingdom";
    }
    let country = value;
    let arrray = props.Store.getAllCountryGeneralDataArray;
    let dataCountry = filterItems(arrray, country);
    setArrayData(dataCountry);
  };

  const filterItemsCountry = (arr, query) => {
    let queryLower = query.toLowerCase();
    //console.log("queryLower", queryLower);
    let dataCountry = arr.filter(item => item[1] === query);

    return dataCountry;
  };

  const filterDeathCountry = value => {
    let country = value;
    let arrray = props.Store.AlldeathPerCountryArray;
    let dataCountry = filterItemsCountry(arrray, country);
    setDeathData(dataCountry);
  };

  const filterConfirmedCountry = value => {
    let country = value;
    let arrray = props.Store.AllconfirmedPerCountry;
    let dataCountry = filterItemsCountry(arrray, country);
    setCasesData(dataCountry);
  };

  const filterRecoverdCountry = async value => {
    let country = value;
    let arrray = props.Store.AllrecoverdPerCountry;
    let dataCountry = filterItemsCountry(arrray, country);
    setRecoveryData(dataCountry);
  };

  const setCoord = value => {
    let country = value;
    let arrray = props.Store.AllrecoverdPerCountry;
    let dataCountry = filterItemsCountry(arrray, country);
    // console.log("coord", dataCountry);
    //console.log("coord", dataCountry);
    let lat = dataCountry[0][2];
    let lon = dataCountry[0][3];
    let location = [lon, lat];
    console.log(location);
    setLocation(location);
  };

  /*  console.log("deathData ", deathData);
  console.log("casesData ", casesData);
  console.log("recoverdData ", recoveryData);
  console.log("coordinatesData ", arrayData[0]);
  console.log("coordinatesData locationData", locationData); */
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
        data: confirmedHistoricalState
      }
    ],

    xaxis: {
      categories: headerHistoricalState
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
        data: deadHistoricalState[0]
      }
    ],

    xaxis: {
      categories: headerHistoricalState[0]
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
        data: recoveredHistoricalState
      }
    ],

    xaxis: {
      categories: headerHistoricalState
    }
  };
  let optionsConfirmed = {
    chart: {
      type: "line"
    },
    series: [
      {
        type: "line",
        name: "Recuperados",
        data: confirmedHistoricalState[0]
      }
    ],

    xaxis: {
      categories: headerHistoricalState[0]
    }
  };

  return (
    <>
      <Button
        variant="text"
        color="primary"
        onClick={handleToggle}
        value={props.value}
      >
        {props.value}
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        {arrayData.length === 0 ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <Paper className={classes.paper}>
              <Grid container spacing={1} className={classes.gridContainerRoot}>
                <Grid item xs={12} sm={6} md={6}>
                  <Map01 coord={arrayData[0].coordinates} />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Card01Title
                        background="rgb(255,255,255,0.3)"
                        textContent={props.value}
                        textContentdivider=""
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="Country / País"
                        textContentSize="22px"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(25,255,25,0.4)"
                        textContentdivider={arrayData[0].capital}
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="Capital / Capital"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(50,50,50,0.4)"
                        textContent={props.cases}
                        textContentdivider=""
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="Cases / Casos"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(145,25,25,0.4)"
                        textContent={props.deaths}
                        textContentdivider=""
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="Deaths / Mortes"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(243,186,45,0.4)"
                        textContent={props.total_recovered}
                        textContentdivider=""
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="Tota Recoverd / Total Recuperados"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(125,11,159,0.4)"
                        textContentdivider={props.new_deaths}
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="New Deaths / Novas Mortes"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(25,125,255,0.4)"
                        textContentdivider={props.new_cases}
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="New Cases / Novos Casos"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(25,25,255,0.4)"
                        textContentdivider={props.serious_critical}
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="Critical / Criticos"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Card01
                        background="rgb(255,25,25,0.4)"
                        textContentdivider={arrayData[0].population}
                        textAfterContent=""
                        textAfterContentSymbol=""
                        textCard="Population / População"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Backdrop>
    </>
  );
};

export default inject("Store")(observer(CityBackdrop));