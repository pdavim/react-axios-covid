import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import Store from "./stores/Store";

import "./index.css";
import App from "./App.js";
const stores = { Store };

class Main extends React.Component {
  render() {
    //console.log("index ", this.props);
    return (
      <Provider {...stores}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.querySelector("#root")); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
