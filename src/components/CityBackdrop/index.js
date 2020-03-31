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

import filterItems from "../../functions/filterItems";

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
  const classes = useStyles();
  const [arrayData, setArrayData] = React.useState([]);
  const [deathData, setDeathData] = React.useState([]);
  const [casesData, setCasesData] = React.useState([]);
  const [recoveryData, setRecoveryData] = React.useState([]);
  const [locationData, setLocation] = React.useState([]);
  //const [arraCountr, setArrayCountrt] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);

  console.log(
    "Store CityBackdrop AlldeathPerCountryArray",
    props.Store.AlldeathPerCountryArray
  );
  /* 
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
  const handleToggle = () => {
    // console.log("value", props.value);
    // console.log("value props", props);
    setOpen(!open);
    filterCountry(props.value);
    filterConfirmedCountry(props.value);
    filterDeathCountry(props.value);
    filterRecoverdCountry(props.value);
    //setCoord(props.value);
    setisLoading(false);
  };
  //console.log("cityBackdrop", props.Store.getAllCountryGeneralDataArray[0]);

  const filterCountry = value => {
    if (value === "USA") {
      value = "United States";
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

  const filterRecoverdCountry = value => {
    let country = value;
    let arrray = props.Store.AllrecoverdPerCountry;
    let dataCountry = filterItemsCountry(arrray, country);
    setRecoveryData(dataCountry);
  };

  const setCoord = value => {
    let country = value;
    let arrray = props.Store.AllrecoverdPerCountry;
    let dataCountry = filterItemsCountry(arrray, country);
    console.log("coord", dataCountry);
    console.log("coord", dataCountry);
    let lat = dataCountry[0][2];
    let lon = dataCountry[0][3];
    let location = [lon, lat];
    console.log(location);
    setLocation(location);
  };

  console.log("deathData ", deathData);
  console.log("casesData ", casesData);
  console.log("recoverdData ", recoveryData);
  console.log("coordinatesData ", arrayData[0]);
  console.log("coordinatesData locationData", locationData);

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
