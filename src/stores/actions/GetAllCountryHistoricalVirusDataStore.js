import { observable, action, decorate, computed, runInAction } from "mobx";
import axios from "axios";
import { readString } from "@react-papaparse";

class GetAllCountryHistoricalVirusDataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  getSingleCityHistoricalVirusData(city) {
    // access todoStore through the root store
    return this.rootStore.todoStore.todos.filter(todo => todo.author === city);
  }

  extData = async () => {
    // this.loadingSingularPage = true;
    //all data from CSSE COVID-19 Dataset
    //https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data
    //

    let csvurlConfirmed =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
    let csvurlDeaths =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
    let csvurlRecoverd =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

    this.headersCountry(csvurlConfirmed);
    this.confirmedPerCountry(csvurlConfirmed);
    this.deathPerCountry(csvurlDeaths);
    this.recoverdPerCountry(csvurlRecoverd);
    //var csv is the CSV file with headers

    this.loadingSingularPage = false;
    // console.log("data City ", this.locationSearchArrayDeath);
    //console.log("data City ", this.locationSearchArrayRecoverd);
  };

  //headers from arrays
  headersCountry = csvurlConfirmed => {
    axios.get(csvurlConfirmed).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});
      let array = papaCsv.data;
      // console.log("headers country ", array[0]);
      this.headersArrayCountry.push(array[0]);

      return this.headersArrayCountry;
    });
  };

  confirmedPerCountry = csvurlConfirmed => {
    axios.get(csvurlConfirmed).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});
      let array = papaCsv.data;
      for (let i = 0; i < array.length; i++) {
        let arrayContry = array[i][1];
        if (arrayContry === this.userSeachLocation) {
          this.locationSearchArrayConfirmed.push(array[i]);
        }
      }
      return this.locationSearchArrayConfirmed;
    });
  };

  deathPerCountry = csvurlDeaths => {
    axios.get(csvurlDeaths).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});

      let array = papaCsv.data;
      for (let i = 0; i < array.length; i++) {
        let arrayContry = array[i][1];
        if (arrayContry === this.userSeachLocation) {
          this.locationSearchArrayDeath.push(array[i]);
        }
      }
      return this.locationSearchArrayDeath;
    });
  };

  recoverdPerCountry = csvurlRecoverd => {
    axios.get(csvurlRecoverd).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});
      let array = papaCsv.data;
      for (let i = 0; i < array.length; i++) {
        let arrayContry = array[i][1];
        if (arrayContry === this.userSeachLocation) {
          this.locationSearchArrayRecoverd.push(array[i]);
        }
      }
      return this.locationSearchArrayRecoverd;
    });
  };

  //**END Class */
}

decorate(GetAllCountryHistoricalVirusDataStore, {
  //Observables
  //Actions
});

export default new GetAllCountryHistoricalVirusDataStore();
