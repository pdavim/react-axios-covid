import { observable, action, decorate } from "mobx";
//import { action,observable } from "mobx-react";

import axios from "axios";

class Store {
  fetchCity = {
    error: "",
    status: "Pending",
    loading: true
  };

  updateDefaultCity = {
    error: "",
    status: "Pending",
    loading: true
  };

  loadingChart;
  loadingMap;
  loadingHistorical;
  loadingGetStation;
  deathPerSecondStore = 0;
  currentDeathCount;
  dieCalTimeStore = 0;
  dieStore = 0;

  //for test porpuses
  test = "hello world";

  //object with the code of active sattion - get data from fecthHistoricalData()
  activeStation;

  //Array object with all station - get data from getStation()
  arrayPushDataStation;

  //Object with the searched city - get data from getWeatherData()
  activeCity;

  //Object with the searched city timezone - get data from fetchTimezone()
  activeCityTimezone;

  //Object with the searched city historical data - get data from fecthHistoricalData()
  historialWeatherData;

  //Object with the searched city sunrise and sunnset data for the present day - get data from getSunRiseSunset()
  sunriseSunsetData;

  //City coord - get data from fetchCoordinates()
  coordenatesLat;
  coordenatesLon;

  //Get current date
  currentDateLocal;

  //city name
  cityName;

  //maxTempDataChart data chart
  maxTempDataChart;
  raindaysChartData;

  //Loading
  isLoading;
  isLoadingTopSection;

  //dayOrNight
  dayOrNightData;

  citiesDataArrayObs = [];

  //CornovirusData
  getCoronaVirusDataArray;

  //MoonPhase Object
  moonPhaseData;
  //Object with the SET default city - localstorage
  defaultCity = JSON.parse(localStorage.getItem("defaultCity")) || null;

  //Object with the SET default Station - localstorage
  defaultStation = JSON.parse(localStorage.getItem("defaultStation")) || null;

  //Object with the SET list of added cities - localstorage
  citiesList = JSON.parse(localStorage.getItem("ÑitiesList")) || [];

  //("get all data")
  getData = async () => {
    await this.getCityCoordinates();
    this.isLoading = false;
    this.storeCounterData();
  };

  //("update weather data")
  updateWeather = () => {
    this.getData();
  };

  //("get cornovirus data")
  getCoronaVirusData = async () => {
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
        // console.log("Cornovirus response ", response);
        this.getCoronaVirusDataArray = response;
        //console.log(
        // "Cornovirus getCoronaVirusDataArray ",
        //  this.getCoronaVirusDataArray
        //  );
      })
      .then(r => {
        let dataCities = this.getCoronaVirusDataArray.data.countries_stat;
        let dataCitiesLength = dataCities.length;
        let errorDataCountry = [];
        for (let i = 0; i < dataCitiesLength; i++) {
          // console.log("city name ", dataCities[i].country_name);

          let country = dataCities[i].country_name;

          if (
            country === "S. Korea" ||
            country === "Diamond Princess" ||
            country === "Czechia" ||
            country === "Faeroe Islands" ||
            country === "North Macedonia" ||
            country === "Channel Islands" ||
            country === "Vatican City" ||
            country === "St. Vincent Grenadines"
          ) {
            // console.log(country);
            errorDataCountry.push(country);
          } else {
            axios({
              method: "GET",
              url: `https://restcountries-v1.p.rapidapi.com/name/${
                dataCities[i].country_name
              }`,
              headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key":
                  "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df"
              }
            })
              .catch(function(error) {
                console.log("Show error notification!");
                return Promise.reject(error);
              })
              .then(rp => {
                // console.log("rp ", rp);
                // console.log("rp ", rp.data[0].capital);
                //console.log("rp ", rp.data[0].latlng);

                // console.log("lat e lon ", rp.data[0].latlng);
                let population = rp.data[0].population;
                let region = rp.data[0].region;
                let lat = rp.data[0].latlng[1];
                let lon = rp.data[0].latlng[0];
                let capital = rp.data[0].capital;
                let coord = [lat, lon];
                this.citiesDataArrayObs.push({
                  markerOffset: -15,
                  name: dataCities[i].country_name,
                  coordinates: coord,
                  region: region,
                  population: population,
                  capital: capital
                  // coordinates: rp.data[0].latlng
                });
                // console.log(this.citiesDataArrayO)
                //console.log(citiesDataArray);
                /*  citiesDataArray.push({
              markerOffset: -15,
              name: dataCities[i].country_name,
              coordinates: rp.data[0].latlng
            }); */
              });
          }
        }
        // console.log("citiesDataArrayObs Apha ", this.citiesDataArrayObs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //("get City Coordinates")
  getCityCoordinates = async () => {
    this.isLoading = true;
    await this.getCoronaVirusData();
    let dataArray = await this.getCoronaVirusDataArray;

    return dataArray;
    // console.log("data Array", dataArray);
  };

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
        // console.log("HAS DATA");
        //console.log(obj + 1);
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
}

//("get counter")

decorate(Store, {
  isLoading: observable,
  loadingChart: observable,
  loadingMap: observable,
  loadingHistorical: observable,
  loadingGetStation: observable,
  deathPerSecondStore: observable,
  currentDeathCount: observable,
  dieStore: observable,
  storeCounterData: action,

  activeStation: observable,

  //Array object with all station - get data from getStation()
  arrayPushDataStation: observable,

  //Object with the searched city - get data from getWeatherData()
  activeCity: observable,

  //Object with the searched city timezone - get data from fetchTimezone()
  activeCityTimezone: observable,

  //Object with the searched city historical data - get data from fecthHistoricalData()
  historialWeatherData: observable,

  //Object with the searched city sunrise and sunnset data for the present day - get data from getSunRiseSunset()
  sunriseSunsetData: observable,

  //City coord - get data from fetchCoordinates()
  coordenatesLat: observable,
  coordenatesLon: observable,

  //Get current date
  currentDateLocal: observable,

  //city name
  cityName: observable,

  //maxTempDataChart data chart
  maxTempDataChart: observable,
  raindaysChartData: observable,

  farmData: observable,

  //Loading

  isLoadingTopSection: observable,

  //dayOrNight
  dayOrNightData: observable,

  citiesDataArrayObs: observable,

  //CornovirusData
  getCoronaVirusDataArray: observable,

  //MoonPhase Object
  moonPhaseData: observable,
  //Object with the SET default city - localstorage
  defaultCity: observable,

  //Object with the SET default Station - localstorage
  defaultStation: observable,

  //Object with the SET list of added cities - localstorage
  citiesList: observable
});

export default new Store();
