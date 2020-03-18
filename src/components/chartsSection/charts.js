import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { observer, inject } from "mobx-react";

import LinearProgress from "@material-ui/core/LinearProgress";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import MapChart from "../MapChart";

import CoronavirusData from "../CoronavirusData";
import "./style.scss";
import CoronaVirusDataPT from "../../assets/data/coronaVirusData";
import ContactForm from "../ContactForm";
const useStyles = makeStyles(theme => ({
  root: {
    //display: "flex",
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },

  menuButton: {
    marginRight: 0,
    color: theme.palette.secondary.white
  },
  title: {
    fontSize: 20,
    fontWeight: 900,
    textTransform: "uppercase",
    padding: theme.spacing(1, 3, 1, 2),
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  appBar: {
    //display: "flex",
    height: 80,
    padding: 0,
    margin: 0,
    //width: "100%",
    //position: "relative",
    backgroundColor: "rgb(255,255,255,0.05)"
  },

  gridContainerSwitch: {
    paddingRight: 0,
    paddingLeft: 0
  },
  gridRoot: {},
  buttomRouter: {
    marginRight: 2,
    marginLeft: 2,
    color: "secondary",
    width: "100px"
  },
  loadingGridItem: {
    //width: 200px;
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 100,
    paddingRight: 100,
    alignItems: "center",
    height: "600px",
    maxHeight: "100%"
  },
  contactGridCntainer: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100%",
    display: "flex",
    color: "white",
    padding: 20
  }
}));

const Charts = inject("Store")(
  observer(props => {
    // console.log("Charts props ", props.Store.historialWeatherData);
    //console.log("Charts props ", this.props.props.Store.historialWeatherData);
    //console.log("Charts props ", props);

    // console.log("Array Max Temp ", array);
    const classes = useStyles();
    return (
      <Router>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <Grid item>
                  <WbSunnyIcon
                    edge="start"
                    className={classes.menuButton}
                    aria-label="menu"
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    className={classes.title}
                    color="inherit"
                  >
                    COVID19
                  </Typography>
                </Grid>
                <Grid item className={classes.buttomRouter} xs={8}>
                  <Button
                    //color={colorText}
                    className={classes.buttomRouter}
                    variant="contained"
                    color="inherit"
                  >
                    <Link to="/">Home</Link>
                  </Button>

                  <Button
                    color="inherit"
                    className={classes.buttomRouter}
                    variant="contained"
                  >
                    <Link to="/map">Map</Link>
                  </Button>

                  <Button
                    color="inherit"
                    className={classes.buttomRouter}
                    variant="contained"
                  >
                    <Link to="/about">About</Link>
                  </Button>

                  <Button
                    color="inherit"
                    variant="contained"
                    className={classes.buttomRouter}
                  >
                    <Link to="/contact">Contact</Link>
                  </Button>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid container spacing={2} className={classes.contactGridCntainer}>
            <Grid item xs={12}>
              <Switch>
                <Route path="/" exact component={Coronavirus} />

                <Route path="/map" component={Map} />
                <Route path="/about" component={About} />

                <Route path="/contact" component={Contact} />

                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </Router>
    );
  })
);

export default Charts;

// About Page
const Map = inject("Store")(
  observer(props => {
    return (
      <Grid item xs={12}>
        <MapChart props={props} />
      </Grid>
    );
  })
);

// About Page
const About = () => (
  <Fragment>
    <h1>About</h1>
    <AboutText />
  </Fragment>
);

// Contact Page
const Contact = () => (
  <Fragment>
    <ContactText />
  </Fragment>
);

const Coronavirus = inject("Store")(
  observer(props => {
    //console.log("menu cvid19 ", props);
    //props.Store.isLoading = false;
    /*  setInterval(function() {
      props.Store.isLoading = false;
    }, 2000);
    */
    let l = {
      prop: "spin",
      name: "Loading"
    };

    return (
      <>
        <Grid container className="">
          {props.Store.isLoading === true ? (
            <>
              <Grid
                container
                justify="center"
                alignItems="center"
                className="loadingGridRoot"
              >
                <Grid item className="loadingGridItem">
                  <LinearProgress color="secondary" />
                  <p className="propText">{l.name}</p>
                </Grid>
              </Grid>
            </>
          ) : props.Store.isLoading === false ? (
            <Grid item className="">
              <CoronavirusData props={props} />
            </Grid>
          ) : (
            <>
              <Grid
                container
                justify="center"
                alignItems="center"
                className="loadingGridRoot"
              >
                <Grid item className="loadingGridItem">
                  <LinearProgress color="secondary" />
                  <p className="propText">{l.name}</p>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  })
);

const ContactText = () => (
  <div>
    <h3>Contact</h3>
    <p>App development by Pedro Davim</p>
    <p>pdavim@pdavim.com</p>
    <ContactForm />
  </div>
);

const AboutText = () => {
  console.log(CoronaVirusDataPT);

  return (
    <>
      <h3>CONVID 19</h3>
      <p>Welcome </p>
      <p>{CoronaVirusDataPT[1].whatis}</p>
      <br />
      <p>{CoronaVirusDataPT[3].transmition}</p>
      <br />
      <p> {CoronaVirusDataPT[2].sintoms[1]}</p>
      <p> {CoronaVirusDataPT[4].incumbationPeriod}</p>
    </>
  );
};

const NoMatch = () => {
  return (
    <div>
      <h3>404 error / No match</h3>
    </div>
  );
};

export const Prop = () => (
  <>
    <h3>loading data</h3>
  </>
);
