import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
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
import CircularProgress from "@material-ui/core/CircularProgress";

//Import Componets
import MapChart from "../MapChart";
import CoronavirusData from "../CoronavirusData";
import AboutC from "../AboutC";
import ContactText from "../ContactText";
import SingularCountryPage from "../SingularCountryPage";
import NewsPage from "../NewsPage";
//import "./style.scss";
import covid19logo_grey from "../../assets/images/covid19logo_grey.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexGrow: 1,
    boxSizing: "border-box",
    justifyContent: "space-between",
    justify: "space-between",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
    height: "50px",
  },
  rootToolbar: {
    display: "flex",
    justifyContent: "",
    alignItems: "center",
    padding: "0px 1%",
    textDecoration: "none",
  },
  rootToolbarGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 10%",
    maxWidth: "40%",
    textDecoration: "none",
  },
  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: 0,
    color: theme.palette.secondary.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 900,
    textTransform: "uppercase",
    padding: theme.spacing(1, 3, 1, 2),
    position: "relative",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  titleGrid: {
    //padding: theme.spacing(1, 3, 1, 2),

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  titleGridMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      align: "right",
      alignItems: "right",
    },
  },

  appBar: {
    //display: "flex",
    minHeight: 60,
    padding: 0,
    margin: 0,
    //width: "100%",
    //position: "relative",
    backgroundColor: "rgb(255,255,255,0.05)",
  },

  gridContainerSwitch: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  gridRoot: {},
  buttomRouterGrid: {
    display: "flex",
    maxWidth: "500px",
  },
  buttomRouter: {
    //display: "flex",
    //alignItens: "flex-end",
    maxWidth: "70px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  loadingGridItem: {
    //width: 200px;
    paddingTop: 100,
    paddingBottom: 40,
    paddingLeft: 100,
    paddingRight: 100,
    alignItems: "center",
    height: "100%",
    maxHeight: "100%",
    // padding: 120,
    alignItems: "center",
    alignContent: "center",
  },
  loadingGridItemText: {
    //width: 200px;
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 100,
    paddingRight: 100,
    alignItems: "center",
    //height: "600px",
    maxHeight: "100%",
    // padding: 120,
    alignItems: "center",
    alignContent: "center",
  },
  cornovirusGridItem: {
    maxHeight: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    width: "100%",
  },
  contactGridCntainer: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100%",
    width: "100%",
    display: "flex",
    color: "white",
    padding: 20,
  },
  mapGridItem: {
    height: "10%",
  },
  fragmentridmobile: {
    direction: "row",
    paddingLeft: 40,
    display: "flex",
    width: "100%",
    // paddingTop: 10,
    alignContent: "center",
    alignItems: "center",
  },
  palette: {
    primary: "white",
    secondary: "black",
    dark: "#0F2D53",
    greenDark: "#25E298",
  },
  image: {
    maxWidth: 40,
    maxHeight: 40,
  },
  imageGrid: {
    //paddingRight: "20px"
    [theme.breakpoints.down("xs")]: {
      display: "true",
    },
  },
  imageGridMobile: {
    paddingRight: "20px",
    paddingTop: "10px",
    alignContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
    },
  },
  buttonMenuMobile: {
    //paddingTop: 0,
    //paddingBottom: 0,
    marging: 0,
  },
  mapdiv: {
    marginTop: 50,
    paddingBottom: 100,
  },
  loadingProgress: {
    height: "100%",
    padding: 120,
    alignItems: "center",
    alignContent: "center",
  },
  error: {
    color: "red",
    fontSize: "20px",
    textAlign: "center",
  },
}));

const Main = inject("Store")(
  observer((props) => {
    // console.log("Charts props ", props.Store.historialWeatherData);
    //console.log("Charts props ", this.props.props.Store.historialWeatherData);

    console.log("Main Page ", props);
    const classes = useStyles();
    return (
      <Grid container className={classes.root}>
        <Router>
          <Grid item xs={12} md={12} className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar className={classes.rootToolbar}>
                <Link to="/">
                  <img
                    src={covid19logo_grey}
                    alt=""
                    className={classes.image}
                  />
                </Link>

                <NavLink
                  to="/"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  <Grid item sm={2} md={2}>
                    <Typography variant="h6" className={classes.title}>
                      COVID19
                    </Typography>
                  </Grid>
                </NavLink>
                <Grid xs={12} className={classes.rootToolbarGrid}>
                  <NavLink
                    to="/"
                    exact
                    style={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 16,
                      textDecoration: "none",
                    }}
                    activeStyle={{
                      fontWeight: "900",
                      color: "#24A34E",
                      fontSize: 16,
                    }}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/map"
                    style={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 16,
                      textDecoration: "none",
                    }}
                    activeStyle={{
                      fontWeight: "900",
                      color: "#24A34E",
                      fontSize: 16,
                    }}
                  >
                    Map
                  </NavLink>

                  <NavLink
                    to="/singularcountry"
                    style={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 16,
                      textDecoration: "none",
                    }}
                    activeStyle={{
                      fontWeight: "900",
                      color: "#24A34E",
                      fontSize: 16,
                    }}
                  >
                    Portugal
                  </NavLink>

                  {
                    (props.Store.latestNews = !undefined ? (
                      <NavLink
                        to="/news"
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 16,
                          textDecoration: "none",
                        }}
                        activeStyle={{
                          fontWeight: "900",
                          color: "#24A34E",
                          fontSize: 16,
                        }}
                      >
                        News
                      </NavLink>
                    ) : (
                      <></>
                    ))
                  }

                  <NavLink
                    to="/about"
                    style={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 16,
                      textDecoration: "none",
                    }}
                    activeStyle={{
                      fontWeight: "900",
                      color: "#24A34E",
                      fontSize: 16,
                    }}
                  >
                    About
                  </NavLink>

                  <NavLink
                    className={classes.cta}
                    to="/contact"
                    style={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 16,
                      textDecoration: "none",
                    }}
                    activeStyle={{
                      fontWeight: "900",
                      color: "#24A34E",
                      fontSize: 16,
                    }}
                  >
                    Contact
                  </NavLink>
                </Grid>
                <Grid item xs={10} md={10} className={classes.titleGridMobile}>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
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
                                  fontWeight: "bold",
                                }}
                                activeStyle={{
                                  fontWeight: "bold",
                                  color: "#0F2D53",
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
                                  fontWeight: "bold",
                                }}
                                activeStyle={{
                                  fontWeight: "bold",
                                  color: "#0F2D53",
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
                                  fontWeight: "bold",
                                }}
                                activeStyle={{
                                  fontWeight: "bold",
                                  color: "#0F2D53",
                                }}
                                to="/singularcountry"
                              >
                                Portugal
                              </NavLink>
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#00905F",
                                fontWeight: "bold",
                              }}
                              activeStyle={{
                                fontWeight: "bold",
                                color: "#0F2D53",
                              }}
                              onClick={popupState.close}
                            >
                              <NavLink to="/news">News</NavLink>
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#00905F",
                                fontWeight: "bold",
                              }}
                              activeStyle={{
                                fontWeight: "bold",
                                color: "#0F2D53",
                              }}
                              onClick={popupState.close}
                            >
                              <NavLink to="/contact">Contact</NavLink>
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#00905F",
                                fontWeight: "bold",
                              }}
                              activeStyle={{
                                fontWeight: "bold",
                                color: "#0F2D53",
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
                <Route path="/news" component={News} />
                <Route path="/about" component={About} />

                <Route path="/contact" component={Contact} />

                <Route path="*" component={Coronavirus} />
              </Switch>
            </Grid>
          </Grid>
        </Router>
      </Grid>
    );
  })
);

export default Main;

// About Page
const Map = inject("Store")(
  observer((props) => {
    let classes = useStyles();
    return (
      <Grid item xs={12} className={classes.mapGridItem}>
        <div className={classes.mapdiv}>
          <MapChart props={props} />
        </div>
      </Grid>
    );
  })
);

// About Page
const About = inject("Store")(
  observer((props) => {
    let classes = useStyles();
    return (
      <Grid item xs={12} className={classes.mapGridItem}>
        <AboutC />
      </Grid>
    );
  })
);

const News = inject("Store")(
  observer((props) => {
    let classes = useStyles();
    return (
      <Grid item xs={12} className={classes.mapGridItem}>
        {props.Store.latestNews.length !== 0 ? (
          <NewsPage />
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
              </Grid>
              <Grid item xs={12} className={classes.loadingGridItem}>
                <Typography className={classes.error}>
                  Sorry, but there seems to be a problem.
                </Typography>
                <Typography className={classes.error}>
                  It s Not our fault but there seems to be a problem with the
                  news server.
                </Typography>
                <Typography className={classes.error}>
                  Please try again later.
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
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
  observer((props) => {
    let arrayLoading = props.Store.headersArrayCountry;
    let isLoadingArray = arrayLoading.length;
    //console.log(props);
    //console.log(arrayLoading);
    return (
      <Fragment>
        <SingularCountryPage
          headers={props.Store.headersArrayCountry}
          dead={props.Store.locationSearchArrayDeath}
          recovered={props.Store.locationSearchArrayRecoverd}
          confirmed={props.Store.locationSearchArrayConfirmed}
        />
      </Fragment>
    );
  })
);

const Coronavirus = inject("Store")(
  observer((props) => {
    //console.log("menu cvid19 ", props);
    //props.Store.isLoading = false;
    /*  setInterval(function() {
      props.Store.isLoading = false;
    }, 2000);
    */
    let l = {
      prop: "spin",
      name: "Loading",
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
