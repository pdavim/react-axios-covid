import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App.js";
//import * as serviceWorker from "./serviceWorker";


import "bootstrap/dist/css/bootstrap.min.css";

class Main extends React.Component {
  render() {
    //console.log("index ", this.props);
    return <App />;
  }
}

ReactDOM.render(<Main />, document.querySelector("#root")); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
