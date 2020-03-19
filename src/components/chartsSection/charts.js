import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";
import { observer, inject } from "mobx-react";

import LinearProgress from "@material-ui/core/LinearProgress";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import MapChart from "../MapChart";
import CoronavirusData from "../CoronavirusData";
import AboutC from "../AboutC";

import "./style.scss";
import covid19logo_grey from "../../assets/images/covid19logo_grey.png";

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
    color: "white",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  titleGrid: {
    //padding: theme.spacing(1, 3, 1, 2),

    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  titleGridMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      align: "right",
      alignItems: "right"
    }
  },

  appBar: {
    //display: "flex",
    minHeight: 60,
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
    width: "100px",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
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
  cornovirusGridItem: {
    maxHeight: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    width: "100%"
  },
  contactGridCntainer: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100%",
    width: "100%",
    display: "flex",
    color: "white",
    padding: 20
  },
  mapGridItem: {
    height: "10%"
  },
  fragmentridMobile: {
    alignContent: "right",
    alignItems: "right",
    paddingLeft: 40,
    display: "flex",
    width: "100%"
  },
  palette: {
    primary: "white",
    secondary: "black",
    dark: "#0F2D53",
    greenDark: "#25E298"
  },
  image: {
    maxWidth: 40,
    maxHeight: 40
  },
  imageGrid: {
    //paddingRight: "20px"
  }
}));

const Charts = inject("Store")(
  observer(props => {
    // console.log("Charts props ", props.Store.historialWeatherData);
    //console.log("Charts props ", this.props.props.Store.historialWeatherData);

    // console.log("Array Max Temp ", array);
    const classes = useStyles();
    return (
      <Router>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <Grid item xs={2} sm={1} className={classes.imageGrid}>
                  <Link to="/">
                    <img
                      src={covid19logo_grey}
                      alt=""
                      className={classes.image}
                    />
                  </Link>
                </Grid>
                <NavLink
                  to="/"
                  style={{
                    color: "white",
                    fontWeight: "bold"
                  }}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  <Grid item sm={2} xs={0}>
                    <Typography variant="h6" className={classes.title}>
                      COVID19
                    </Typography>
                  </Grid>
                </NavLink>

                <Grid item className={classes.buttomRouter} xs={11} sm={9}>
                  <Button
                    //color={colorText}
                    className={classes.buttomRouter}
                    variant="contained"
                    color="inherit"
                  >
                    <NavLink
                      to="/"
                      exact
                      style={{
                        color: "#00905F",
                        fontWeight: "bold"
                      }}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0F2D53"
                      }}
                    >
                      Home
                    </NavLink>
                  </Button>

                  <Button
                    color="inherit"
                    className={classes.buttomRouter}
                    variant="contained"
                  >
                    <NavLink
                      to="/map"
                      style={{
                        color: "#00905F",
                        fontWeight: "bold"
                      }}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0F2D53"
                      }}
                    >
                      Map
                    </NavLink>
                  </Button>

                  <Button
                    color="inherit"
                    className={classes.buttomRouter}
                    variant="contained"
                  >
                    <NavLink
                      to="/about"
                      style={{
                        color: "#00905F",
                        fontWeight: "bold"
                      }}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0F2D53"
                      }}
                    >
                      About
                    </NavLink>
                  </Button>

                  <Button
                    color="inherit"
                    variant="contained"
                    className={classes.buttomRouter}
                  >
                    <NavLink
                      to="/contact"
                      style={{
                        color: "#00905F",
                        fontWeight: "bold"
                      }}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0F2D53"
                      }}
                    >
                      Contact
                    </NavLink>
                  </Button>
                </Grid>
                <Grid item xs={10} className={classes.titleGridMobile}>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                      <React.Fragment className={classes.fragmentridMobile}>
                        <Button
                          variant="contained"
                          color="inherit"
                          {...bindTrigger(popupState)}
                          fragmentridMobile
                        >
                          Open Menu
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/">Home</Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/map">Map</Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/contact">Contact</Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/about">About</Link>
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid container spacing={2} className={classes.mapGridItem}>
            <Grid item xs={12} className={classes.mapGridItem}>
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
    let classes = useStyles();
    return (
      <Grid item xs={12} className={classes.mapGridItem}>
        <MapChart props={props} />
      </Grid>
    );
  })
);

// About Page
const About = inject("Store")(
  observer(props => {
    let classes = useStyles();
    return (
      <Grid item xs={12} className={classes.mapGridItem}>
        <AboutC />
      </Grid>
    );
  })
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
    let classes = useStyles();
    return (
      <>
        <Grid container className="rootCornovioros">
          {props.Store.isLoading === true ? (
            <>
              <Grid
                container
                justify="center"
                alignItems="center"
                className="loadingGridRoot"
              >
                <Grid item className={classes.loadingGridItem} xs={12}>
                  <LinearProgress color="secondary" />
                  <p className="propText">{l.name}</p>
                </Grid>
              </Grid>
            </>
          ) : props.Store.isLoading === false ? (
            <Grid item className={classes.cornovirusGridItem} xs={12}>
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
                <Grid item className={classes.loadingGridItem} xs={12}>
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
  </div>
);

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
