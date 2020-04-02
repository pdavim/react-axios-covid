import { observable, action, decorate, computed, runInAction } from "mobx";
import { readString } from "react-papaparse";
import axios from "axios";
import CornovirusData from "../assets/data/coronaVirusData";
import filterItems from "../functions/filterItems";

import portugalCovidNatinalData from "../assets/data/portugalCovidNatinalData";
class Store {
  constructor() {
    // this.updateWeather();
  }
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
  getSingleCountryInfo = [];
  generalCountryCovidData = [];
  generalCountryCovidDataDate;
  errorDataCountry = [];
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

  isLoadingTopSection = true;

  //dayOrNight
  dayOrNightData;

  //Countries coord
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

  //New Observables
  countryNameWithCornovirus;
  getAllCountryCornovirusDataObs;
  updateDateObs;
  userSeachLocation = "Portugal";
  portugalCovidNationalDataInfo = portugalCovidNatinalData;
  mapChartArrayData = [];
  isLoading = true;
  getAllCountryGeneralDataArray = [];
  AlldeathPerCountryArray;
  AllrecoverdPerCountry;
  AllconfirmedPerCountry;
  latestNews;

  //getAllCountryCornovirusData 1º
  getAllCountryCornovirusData = async () => {
    await axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df"
      }
    }).then(resp => {
      this.getAllCountryCornovirusDataObs = resp;
      console.log(
        "this.getAllCountryCornovirusDataObs ",
        this.getAllCountryCornovirusDataObs
      );
    });
  };

  //("get cornovirus data")
  getCoronaVirusData = async () => {
    let array = await this.getAllCountryCornovirusDataObs.data.countries_stat;
    let countryNameWithCornovirusLenth = array.length;

    for (let i = 0; i < countryNameWithCornovirusLenth; i++) {
      let country = await this.getAllCountryCornovirusDataObs.data
        .countries_stat[i].country_name;
      if (country === "S. Korea") {
        country = "South Korea";
      }

      if (country === "Czechia") {
        country = "Czech Republic";
      }
      if (country === "North Macedonia") {
        country = "Republic of Macedonia";
      }
      if (country === "British Virgin Islands") {
        country = "Virgin Islands (British)";
      }
      if (country === "Turks and Caicos Islands") {
        country = "Turks and Caicos Islands";
      }
      if (country === "St. Vincent Grenadines") {
        country = "Saint Vincent and the Grenadines";
      }
      if (country === "UK") {
        country = "United Kingdom";
      }
      //console.log(country);
      if (
        country === "S. Korea" ||
        country === "Diamond Princess" ||
        country === "Czechia" ||
        country === "Faeroe Islands" ||
        country === "North Macedonia" ||
        country === "Channel Islands" ||
        country === "Vatican City" ||
        country === "British Virgin Islands" ||
        //country === "Turks and Caicos Islands" ||
        country === "MS Zaandam" ||
        country === "Caribbean" ||
        country === "St. Vincent Grenadines"
      ) {
        console.log(country);
      } else {
        //  console.log("good", country);
        this.getAllCountryGeneralData(country);
      }
    }
  };

  //get countryinfo - population, coord, capital, etc
  getAllCountryGeneralData = async countryName => {
    await axios({
      method: "GET",
      url: `https://restcountries-v1.p.rapidapi.com/name/${countryName}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df"
      }
    })
      .then(rp => {
        this.pushCountryData(rp);
      })
      .catch(function(error) {
        console.log(
          "Error notification!  Store getAllCountryGeneralData function, with country",
          countryName
          // this.errorDataCountry.push(countryName)
        );
        console.log(
          "Error notification!  Store getAllCountryGeneralData function, with error",
          error + " " + countryName
          // this.errorDataCountry.push(countryName)
        );
        //this.errorDataCountry.push(countryName);
        // return Promise.reject(error);
      });
  };

  pushCountryData = async rp => {
    this.getAllCountryGeneralDataArray.push({
      markerOffset: -5,
      xmarkerOffset: -5,
      name: rp.data[0].name,
      coordinates: [rp.data[0].latlng[1], rp.data[0].latlng[0]],
      region: rp.data[0].region,
      population: rp.data[0].population,
      capital: rp.data[0].capital
    });
  };

  //("user browser language")
  //("update weather data")
  updateWeather = async () => {
    await this.getData();
  };

  //("get all data")
  getData = async () => {
    this.isLoading = true;
    await this.getAllCountryCornovirusData();
    await this.getCoronaVirusData();
    await this.getLastUpdateDate();
    //
    await this.extData();
    this.isLoading = false;
    this.getLatestNews();
    //this.storeCounterData();
  };

  //get update date
  getLastUpdateDate = () => {
    this.updateDateObs = this.getAllCountryCornovirusDataObs.data.statistic_taken_at;
    return this.updateDateObs;
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
      this.AllconfirmedPerCountry = papaCsv.data;
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
      this.AlldeathPerCountryArray = papaCsv.data;

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
      this.AllrecoverdPerCountry = papaCsv.data;
      for (let i = 0; i < array.length; i++) {
        let arrayContry = array[i][1];
        if (arrayContry === this.userSeachLocation) {
          this.locationSearchArrayRecoverd.push(array[i]);
        }
      }
      return this.locationSearchArrayRecoverd;
    });
  };

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
    console.log("data City ", this.locationSearchArrayDeath);
    //console.log("data City ", this.locationSearchArrayRecoverd);
  };

  userLanguage = () => {
    let userLang = navigator.language || navigator.userLanguage;

    console.log("coronavirus componet ", userLang);
  };

  //get latest news
  getLatestNews = () => {
    axios({
      method: "GET",
      url:
        "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        "x-rapidapi-key": "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df"
      },
      params: {
        autoCorrect: "false",
        pageNumber: "1",
        pageSize: "20",
        q: "covid",
        safeSearch: "false"
      }
    })
      .then(response => {
        console.log("getLatestNews ", response);
        this.latestNews = response;
      })
      .catch(error => {
        console.log("getLatestNews error ", error);
      });
  };
}

decorate(Store, {
  //new Observables
  getAllCountryCornovirusDataObs: observable,
  countryNameWithCornovirus: observable,
  getAllCountryGeneralDataArray: observable,
  getSingleCountryInfo: observable,
  AlldeathPerCountryArray: observable,
  AllrecoverdPerCountry: observable,
  AllconfirmedPerCountry: observable,
  errorDataCountry: observable,
  latestNews: observable,
  //Old
  getLastUpdateDate: action,
  getSingleCountryInfoF: action,
  getUserCountryData: action,
  getSingluarCountryData: action,
  userLanguage: action,
  //getAllCountryGeneralData: computed,

  userLang: observable,
  storeCounterData: action,
  calcTime: action,
  extData: action,
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
  generalCountryCovidData: observable,
  generalCountryCovidDataDate: observable,
  userSeachLocation: observable,

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
