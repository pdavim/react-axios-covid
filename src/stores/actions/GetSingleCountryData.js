import { observable, action, decorate, computed, runInAction } from "mobx";
import axios from "axios";
import { readString } from "@react-papaparse";

class GetVirusDataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  getSingleCityVirusData(city) {
    // access todoStore through the root store
    return this.rootStore.todoStore.todos.filter(todo => todo.author === city);
  }

  getUserCountryData = async () => {
    await this.getSingluarCountryData();
    await this.getSingleCountryInfoF();
  };
  getSingluarCountryData = async () => {
    await axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df"
      }
    })
      .then(response => {
        this.getCoronaVirusDataArray = response.data;
        return this.getCoronaVirusDataArray;
      })
      .then(resp => {
        //  console.log("resp store ", resp.countries_stat);
        let arrayData = [];
        let arrayRes = resp.countries_stat;
        let arrayResLength = arrayRes.length;
        for (let i = 0; i < arrayResLength; i++) {
          if (resp.countries_stat[i].country_name === "Portugal") {
            arrayData.push(resp.countries_stat[i]);
          }
        }
        return arrayData;
      })
      .then(res => {
        this.singleCountryDataStore = res;
        //this.getSingleCountryInfoF();
        console.log("Country data ", res);
      });
  };

  //Get single contry info coord/population
  getSingleCountryInfoF = async () => {
    let array = this.citiesDataArrayObs;
    let arraySingle = [];
    let arrayResLengthInfo = array.length;
    //console.log("array single ", array);
    for (let i = 0; i < arrayResLengthInfo; i++) {
      if (this.citiesDataArrayObs[i].name === "Portugal") {
        arraySingle.push(await this.citiesDataArrayObs[i]);
      }
    }
    this.getSingleCountryInfo = arraySingle;
    //return this.getSingleCountryInfo;
  };

  //**END Class */
}

decorate(GetVirusDataStore, {
  //Observables
  //Actions
});

export default new GetVirusDataStore();
