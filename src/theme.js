import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "OpenSans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    subtitle1: {
      fontSize: 12
    },
    body1: {
      fontWeight: 300
    },
    button: {
      fontStyle: "regular"
    },
    h3: {
      fontSize: "1.2rem"
    },
    h2: {
      fontSize: "1.4rem"
    },
    h1: {
      fontSize: "1.6rem"
    },
    h4: {
      fontSize: "1.0rem"
    }
  },

  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  title: {
    primary: {
      weigth: 900
    },
    secondary: {
      weigth: 900
    }
  },
  palette: {
    primary: {
      light: "#a6d4fa",
      main: "#90caf9",
      dark: "#aa647b",
      contrastText: "#fff",
      textLight: "white"
    },
    secondary: {
      headerBackground: "#336699",
      footerBackground: "#336699",
      sidebarBackground: "#336699",
      topSectionBackground: "#336699",
      bottomSectionBackground: "#336699",
      background: "#00A6ED",
      alert: "#f6511d",
      lightWarm: "#F3A712",
      light: "#FFB400",
      main: "#336699",
      dark: "#0D2C54",
      contrastText: "#7FB800",
      other: "#0D2C54",
      white: "#ffffff",
      greyLight: "#BFBFBF"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#ffcc00"
    },

    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "#ffcc00"
    },
    info: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#ffcc00"
    },
    sucess: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "#ffcc00"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

export default theme;
