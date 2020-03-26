import { observable, action, decorate, autorun, computed } from "mobx";
//import { action,observable } from "mobx-react";
import { readString } from "react-papaparse";
import axios from "axios";
import CornovirusData from "../assets/data/coronaVirusData";
import portugalCovidNatinalData from "../assets/data/portugalCovidNatinalData.js";

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

  loadingSingularPage;
  loadingChart;
  loadingMap;
  loadingHistorical;
  loadingGetStation;
  deathPerSecondStore = 0;
  currentDeathCount;
  dieCalTimeStore = 0;
  dieStore = 0;
  virusInfoData = CornovirusData;
  whcCornovirusDataConfirmed;
  whcCornovirusDataConfirmedArrayObj;
  whcCornovirusDataDeathArrayObj;
  whcCornovirusDataDeath;
  whcCornovirusDataRecoverdArrayObj;
  whcCornovirusDataRecoverd;
  objectCSSEGISandData;
  userLang;
  locationSearchArrayDeath = [];
  locationSearchArrayConfirmed = [];
  locationSearchArrayRecoverd = [];
  headersArrayCountry = [];
  singleCountryDataStore = [];
  getSingleCountryInfoSTORE = [];
  generalCountryCovidData = [];
  generalCountryCovidDataDate;
  portugalCovidNationalDataInfo;
  singleLocationCountry = "Portugal";
  //for test porpuses
  test = "hello world";

  //Object with the searched city - get data from getWeatherData()
  activeCity;

  //maxTempDataChart data chart
  maxTempDataChart;

  //Loading
  isLoading;

  //Countries coord
  citiesDataArrayObs = [];

  //CornovirusData
  getCoronaVirusDataArray;

  //Object with the SET default city - localstorage
  defaultCity = JSON.parse(localStorage.getItem("defaultCity")) || null;

  //Object with the SET default Station - localstorage
  defaultStation = JSON.parse(localStorage.getItem("defaultStation")) || null;

  //Object with the SET list of added cities - localstorage
  citiesList = JSON.parse(localStorage.getItem("ÑitiesList")) || [];

  //("get all data")
  getData = async () => {
    this.isLoading = true;
    this.userLanguage();
    await this.getCityCoordinates();
    this.storeCounterData();
    this.getNationaldata();
    this.getSingleCountryInfoF();
    await this.extData();

    this.isLoading = false;
  };

  //("user browser language")

  //("update weather data")
  updateWeather = async () => {
    await this.getData();
  };

  //(get national data
  getNationaldata = () => {
    const autoRUnData = () => {
      return (this.portugalCovidNationalDataInfo = portugalCovidNatinalData);
    };
    autorun(autoRUnData);
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
        return response;
      })
      .then(r => {
        //console.log("r", r);
        this.getCoronaVirusDataArray = r;
        this.generalCountryCovidData = this.getCoronaVirusDataArray.data.countries_stat;
        this.generalCountryCovidDataDate = r.data.statistic_taken_at;
        let dataCities = r.data.countries_stat;
        let dataCitiesLength = dataCities.length;
        let errorDataCountry = [];
        for (let i = 0; i < dataCitiesLength; i++) {
          // console.log("city name ", dataCities[i].country_name);

          if (
            dataCities[i].country_name === "S. Korea" ||
            dataCities[i].country_name === "Diamond Princess" ||
            dataCities[i].country_name === "Czechia" ||
            dataCities[i].country_name === "Faeroe Islands" ||
            dataCities[i].country_name === "North Macedonia" ||
            dataCities[i].country_name === "Channel Islands" ||
            dataCities[i].country_name === "Vatican City" ||
            dataCities[i].country_name === "St. Vincent Grenadines" ||
            dataCities[i].country_name === "British Virgin Islands"
          ) {
            // console.log(country);
            errorDataCountry.push(dataCities[i].country_name);
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
                console.log(
                  "Show error notification!",
                  dataCities[i].country_name
                );
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
                  markerOffset: -5,
                  xmarkerOffset: -5,
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
        // console.log("Cornovirus response ", response);
        this.getCoronaVirusDataArray = response.data;
        // console.log("response ", response);
        return this.getCoronaVirusDataArray;
      })
      .then(resp => {
        // console.log("resp store ", resp.countries_stat);
        let arrayData = [];
        let arrayRes = resp.countries_stat;
        let arrayResLength = arrayRes.length;
        for (let i = 0; i < arrayResLength; i++) {
          if (resp.countries_stat[i].country_name === "Portugal") {
            arrayData.push(resp.countries_stat[i]);
          }
        }
        this.getSingleCountryInfoF();
        return arrayData;
      })
      .then(res => {
        this.singleCountryDataStore = res;
        // console.log("Country data ", res);
      });
  };

  //Get single contry info coord/population
  getSingleCountryInfoF = async () => {
    this.getCoronaVirusData();
    let array = this.citiesDataArrayObs;

    // console.log("array single ", array);
    for (let i = 0; i < array.length; i++) {
      if (this.citiesDataArrayObs[i].name === "Portugal") {
        this.getSingleCountryInfoSTORE.push(this.citiesDataArrayObs[i]);
      }
    }
    // this.getSingleCountryInfoSTORE = arraySingle;
    //return this.getSingleCountryInfo;
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

  //action
  csvJSON = csv => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  };

  //action single data country get
  extData = async () => {
    //all data from CSSE COVID-19 Dataset
    //https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data
    //

    let csvurlConfirmed =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";
    let csvurlDeaths =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv";
    let csvurlRecoverd =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv";

    this.loadingSingularPage = true;
    await this.deathPerCountry(csvurlDeaths, this.singleLocationCountry);
    await this.recoverdPerCountry(csvurlRecoverd, this.singleLocationCountry);
    await this.confirmedPerCountry(csvurlConfirmed, this.singleLocationCountry);
    await this.headersCountry(csvurlConfirmed);
    await this.getSingluarCountryData();
    this.loadingSingularPage = false;
  };

  //var csv is the CSV file with headers
  //Actions headers from arrays
  headersCountry = async csvurlConfirmed => {
    await axios.get(csvurlConfirmed).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});
      let array = papaCsv.data;
      // console.log("headers country ", array[0]);
      this.headersArrayCountry.push(array[0]);

      return this.headersArrayCountry;
    });
  };

  //action Deaths
  deathPerCountry = async (csvurlDeaths, location) => {
    await axios.get(csvurlDeaths).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});

      let array = papaCsv.data;
      for (let i = 0; i < array.length; i++) {
        let arrayContry = array[i][1];
        if (arrayContry === location) {
          this.locationSearchArrayDeath.push(array[i]);
        }
      }
      return this.locationSearchArrayDeath;
    });
  };

  //action
  //Conifirmed Cases
  confirmedPerCountry = async (csvurlConfirmed, location) => {
    await axios.get(csvurlConfirmed).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});
      let array = papaCsv.data;
      for (let i = 0; i < array.length; i++) {
        let arrayContry = array[i][1];
        if (arrayContry === location) {
          this.locationSearchArrayConfirmed.push(array[i]);
        }
      }
      return this.locationSearchArrayConfirmed;
    });
  };

  // action Recoverd
  recoverdPerCountry = async (csvurlRecoverd, location) => {
    await axios.get(csvurlRecoverd).then(res => {
      let data = res.data;
      let papaCsv = readString(data, {});
      let array = papaCsv.data;
      for (let i = 0; i < array.length; i++) {
        let arrayContry = array[i][1];
        if (arrayContry === location) {
          this.locationSearchArrayRecoverd.push(array[i]);
        }
      }
      return this.locationSearchArrayRecoverd;
    });
  };

  userLanguage = () => {
    this.userLang = navigator.language || navigator.userLanguage;

    // console.log("user-lang ", this.userLang);
  };
}

decorate(Store, {
  getSingluarCountryData: action,
  userLanguage: action,
  getSingleCountryInfo: action,
  headersCountry: action,
  getData: action,
  userLang: observable,
  recoverdPerCountry: action,
  confirmedPerCountry: action,
  deathPerCountry: action,
  updateWeather: action,
  storeCounterData: action,
  getSingleCountryInfoF: action,
  calcTime: action,
  extData: action,
  singleLocationCountry: observable,
  isLoading: observable,
  loadingChart: observable,
  loadingMap: observable,
  loadingHistorical: observable,
  loadingGetStation: observable,
  deathPerSecondStore: observable,
  currentDeathCount: observable,
  dieStore: observable,
  virusInfoData: observable,
  whcCornovirusDataConfirmed: observable,
  whcCornovirusDataConfirmedArrayObj: observable,
  whcCornovirusDataRecoverdArrayObj: observable,
  whcCornovirusDataRecoverd: observable,
  objectCSSEGISandData: observable,
  locationSearchArrayDeath: observable,
  locationSearchArrayConfirmed: observable,
  locationSearchArrayRecoverd: observable,
  headersArrayCountry: observable,
  loadingSingularPage: observable,
  singleCountryDataStore: observable,
  getSingleCountryInfoSTORE: observable,
  generalCountryCovidData: observable,
  generalCountryCovidDataDate: observable,
  portugalCovidNationalDataInfo: observable,

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
