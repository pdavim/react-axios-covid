import React, { Fragment } from "react";

class DeathCounter extends React.Component {
  // Update the count down every 1 second

  render() {
    //let h = this.counterData(this.state.die);
    //console.log("death counter ", this.props.store.Store.dieCalTimeStore);

    let number = this.props.store.Store.dieCalTimeStore;
    let roundNumber = number.toFixed(0);
    let varRound = () => {
      console.log(this.props.store.Store);
      return roundNumber;
    };
    let d = varRound;
    //console.log(d);
    setInterval(d, 1000);

    return <Fragment>{this.props.store.Store.dieCalTimeStore}</Fragment>;
  }
}

export default DeathCounter;
