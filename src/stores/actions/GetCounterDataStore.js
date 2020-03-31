import { observable, action, decorate, computed, runInAction } from "mobx";
import axios from "axios";
import { readString } from "@react-papaparse";

class GetVirusDataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  storeCounterData = () => {
    let counterData = () => {
      setInterval(this.calcTime, 1000);
      // console.log();
      let obj = this.dieStore;
      const isEmpty = obj => {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return false;
          }
        }
        return JSON.stringify(obj) === JSON.stringify({});
      };
      if (isEmpty(obj) === true || typeof obj === "string") {
        console.log("NO DATA");
        this.dieStore = 0;
        return;
      } else {
        //console.log("HAS DATA");
        // console.log(obj + 1);
        this.dieStore = obj + 1;
        let a = this.dieStore;
        return a;
      }
    };

    let f = counterData();
    //console.log("dieStore ", f);
    //  console.log("dieStore ", this.dieCalTimeStore);
    setInterval(f, 1000);
  };

  calcTime = () => {
    let l = 172;

    let now = new Date().getTime();
    let hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((now % (1000 * 60)) / 1000);

    let dHours = hours * 60 * 60;
    let dMinutes = minutes * 60;
    let dSeconds = seconds;
    let mSeconds = dHours + dMinutes + dSeconds;
    let currentDeath = mSeconds * l;
    let totalSeconds = 24 * 60 * 60;

    this.dieCalTimeStore = currentDeath / totalSeconds;
  };

  //**END Class */
}

decorate(GetVirusDataStore, {
  //Observables
  //Actions
});

export default new GetVirusDataStore();
