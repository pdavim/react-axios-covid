import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";
import { observer, inject } from "mobx-react";

//Import Material UI
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

//Import Componets
import MapChart from "../MapChart";
import CoronavirusData from "../CoronavirusData";
import AboutC from "../AboutC";
import ContactText from "../ContactText";
import SingularCountryPage from "../SingularCountryPage";
//import "./style.scss";
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
  buttomRouterGrid: {
    display: "flex",
    maxWidth: "500px"
  },
  buttomRouter: {
    //display: "flex",
    //alignItens: "flex-end",
    maxWidth: "70px",
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
  fragmentridmobile: {
    direction: "row",
    paddingLeft: 40,
    display: "flex",
    width: "100%",
    // paddingTop: 10,
    alignContent: "center",
    alignItems: "center"
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
    [theme.breakpoints.down("xs")]: {
      display: "true"
    }
  },
  imageGridMobile: {
    paddingRight: "20px",
    paddingTop: "10px",
    alignContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignContent: "center",
      alignItems: "center"
    }
  },
  buttonMenuMobile: {
    //paddingTop: 0,
    //paddingBottom: 0,
    marging: 0
  }
}));

const Main = inject("Store")(
  observer(props => {
    // console.log("Charts props ", props.Store.historialWeatherData);
    //console.log("Charts props ", this.props.props.Store.historialWeatherData);

    console.log("Array Max Temp ", props);
    const classes = useStyles();
    return (
      <Router>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} md={12}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <Grid item xs={2} sm={1} md={1} className={classes.imageGrid}>
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
                  <Grid item sm={2} md={2}>
                    <Typography variant="h6" className={classes.title}>
                      COVID19
                    </Typography>
                  </Grid>
                </NavLink>

                <Grid
                  container
                  spacing={1}
                  className={classes.buttomRouterGrid}
                >
                  <Grid item xs={2}>
                    <Button
                      //fullWidth={true}
                      size="small"
                      disableElevation={true}
                      disableFocusRipple={true}
                      disableRipple={true}
                      //color={colorText}
                      className={classes.buttomRouter}
                      variant="text"
                      //color="inherit"
                    >
                      <NavLink
                        to="/"
                        exact
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                        activeStyle={{
                          fontWeight: "900",
                          color: "#24A34E",
                          fontSize: 16
                        }}
                      >
                        Home
                      </NavLink>
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      disableRipple={true}
                      size="small"
                      disableElevation={true}
                      disableFocusRipple={true}
                      //color={colorText}
                      className={classes.buttomRouter}
                      variant="text"
                    >
                      <NavLink
                        to="/map"
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                        activeStyle={{
                          fontWeight: "900",
                          color: "#24A34E",
                          fontSize: 16
                        }}
                      >
                        Map
                      </NavLink>
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      disableRipple={true}
                      size="small"
                      disableElevation={true}
                      disableFocusRipple={true}
                      //color={colorText}
                      className={classes.buttomRouter}
                      variant="text"
                    >
                      <NavLink
                        to="/singularcountry"
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                        activeStyle={{
                          fontWeight: "900",
                          color: "#24A34E",
                          fontSize: 16
                        }}
                      >
                        Portugal
                      </NavLink>
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      disableRipple={true}
                      size="small"
                      disableElevation={true}
                      disableFocusRipple={true}
                      //color={colorText}
                      className={classes.buttomRouter}
                      variant="text"
                    >
                      <NavLink
                        to="/about"
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                        activeStyle={{
                          fontWeight: "900",
                          color: "#24A34E",
                          fontSize: 16
                        }}
                      >
                        About
                      </NavLink>
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      // fullWidth={true}
                      size="small"
                      disableElevation={true}
                      disableFocusRipple={true}
                      disableRipple={true}
                      //color={colorText}
                      className={classes.buttomRouter}
                      variant="text"
                    >
                      <NavLink
                        to="/contact"
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                        activeStyle={{
                          fontWeight: "900",
                          color: "#24A34E",
                          fontSize: 16
                        }}
                      >
                        Contact
                      </NavLink>
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={10} md={10} className={classes.titleGridMobile}>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                      <Fragment>
                        <Grid
                          className={classes.fragmentridmobile}
                          xs={10}
                          sm={11}
                          md={11}
                          item
                        >
                          <Button
                            variant="outlined"
                            color="inherit"
                            {...bindTrigger(popupState)}
                            className={classes.buttonMenuMobile}
                          >
                            Menu
                          </Button>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              <NavLink
                                exact
                                style={{
                                  color: "#00905F",
                                  fontWeight: "bold"
                                }}
                                activeStyle={{
                                  fontWeight: "bold",
                                  color: "#0F2D53"
                                }}
                                to="/"
                              >
                                Home
                              </NavLink>
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              <NavLink
                                style={{
                                  color: "#00905F",
                                  fontWeight: "bold"
                                }}
                                activeStyle={{
                                  fontWeight: "bold",
                                  color: "#0F2D53"
                                }}
                                to="/map"
                              >
                                Map
                              </NavLink>
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              <NavLink
                                style={{
                                  color: "#00905F",
                                  fontWeight: "bold"
                                }}
                                activeStyle={{
                                  fontWeight: "bold",
                                  color: "#0F2D53"
                                }}
                                to="/singularcountry"
                              >
                                Portugal
                              </NavLink>
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#00905F",
                                fontWeight: "bold"
                              }}
                              activeStyle={{
                                fontWeight: "bold",
                                color: "#0F2D53"
                              }}
                              onClick={popupState.close}
                            >
                              <NavLink to="/contact">Contact</NavLink>
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#00905F",
                                fontWeight: "bold"
                              }}
                              activeStyle={{
                                fontWeight: "bold",
                                color: "#0F2D53"
                              }}
                              onClick={popupState.close}
                            >
                              <NavLink to="/about">About</NavLink>
                            </MenuItem>
                          </Menu>
                        </Grid>
                      </Fragment>
                    )}
                  </PopupState>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid container spacing={2} className={classes.mapGridItem}>
            <Grid item xs={12} md={12} sm={12} className={classes.mapGridItem}>
              <Switch>
                <Route path="/" exact component={Coronavirus} />

                <Route path="/map" component={Map} />
                <Route path="/singularcountry" component={SingularCountry} />
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

export default Main;

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

const SingularCountry = inject("Store")(
  observer(props => {
    let arrayLoading = props.Store.headersArrayCountry;
    let isLoadingArray = arrayLoading.length;
    console.log(props);
    console.log(arrayLoading);
    return (
      <Fragment>
        {props.Store.loadingSingularPage === true ? (
          <h1>is loading</h1>
        ) : (
          <SingularCountryPage
            headers={props.Store.headersArrayCountry}
            dead={props.Store.locationSearchArrayDeath}
            recovered={props.Store.locationSearchArrayRecoverd}
            confirmed={props.Store.locationSearchArrayConfirmed}
          />
        )}
      </Fragment>
    );
  })
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
                <Grid item className={classes.loadingGridItem} xs={12} md={12}>
                  <LinearProgress color="secondary" />
                  <p className="propText">{l.name}</p>
                </Grid>
              </Grid>
            </>
          ) : props.Store.isLoading === false ? (
            <Grid item xs={12} md={12} className={classes.cornovirusGridItem}>
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
                <Grid item className={classes.loadingGridItem} xs={12} md={12}>
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

const ContactTextA = () => (
  <Grid>
    <Typography>Contact</Typography>
    <Typography>App development by Pedro Davim</Typography>
    <Typography>pdavim@pdavim.com</Typography>
    <a href="https://pdavim.com">PDAVIM.COM</a>
  </Grid>
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
