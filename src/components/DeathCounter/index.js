import React, { Fragment } from "react";

class DeathCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diedStore: 0,
      die: {},

      deathCountRound: 0
    };
  }

  // Update the count down every 1 second

  calcTime = () => {
    let l = 172;

    let time = new Date().toLocaleString();
    let now = new Date().getTime();
    let days = Math.floor(now / (1000 * 60 * 60 * 24));
    let hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((now % (1000 * 60)) / 1000);

    let dHours = hours * 60 * 60;
    let dMinutes = minutes * 60;
    let dSeconds = seconds;
    let mSeconds = dHours + dMinutes + dSeconds;
    let currentDeath = mSeconds * l;
    let totalSeconds = 24 * 60 * 60;

    let currentTime = dHours + dMinutes + dSeconds;

    let diedStore = currentDeath / totalSeconds;

    this.setState({
      die: diedStore
    });
  };

  counterData = counter => {
    setInterval(this.calcTime, 5000);
    let obj = counter;
    const isEmpty = obj => {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }

      return JSON.stringify(obj) === JSON.stringify({});
    };

    if (isEmpty(obj) === true) {
      //console.log("NO DATA");
      counter = 0;
      return counter;
    } else {
      counter = parseFloat(obj).toFixed(2);
      return counter;
    }
  };

  render() {
    let h = this.counterData(this.state.die);
    //console.log("death counter ", this.props.store.Store.dieCalTimeStore);

    let number = this.props.store.Store.dieCalTimeStore;
    let roundNumber = number.toFixed(0);

    return <Fragment>{roundNumber}</Fragment>;
  }
}

export default DeathCounter;
