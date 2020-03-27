import { observable, action, decorate, computed } from "mobx";
//import { action,observable } from "mobx-react";
import { readString, CSVReader, readRemoteFile } from "react-papaparse";
import axios from "axios";
import CornovirusData from "../assets/data/coronaVirusData";
import { isArray } from "util";
import portugalCovidNatinalData from "../assets/data/portugalCovidNatinalData";
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
  isLoading = true;
  isLoadingTopSection;

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
  //("get all data")
  getData = async () => {
    //this.isLoading = true;
    await this.getAllCountryCornovirusData();
    await this.getCoronaVirusData();
    await this.getLastUpdateDate();
    this.isLoading = false;
    await this.getSingluarCountryData();
    await this.extData();
    await this.mapchartData();
    this.storeCounterData();
  };

  //("user browser language")
  //("update weather data")
  updateWeather = () => {
    this.getData();
  };

  mapchartData = async () => {
    let data = this.citiesDataArrayObs;
    let dataLength = data.length;

    for (let i = 0; i < dataLength; i++) {
      let a = await this.citiesDataArrayObs[i].coordinates;
      let weight = 45;
      let finalData = [a[0], a[1], weight];
      this.mapChartArrayData.push(finalData);
    }
    console.log("mapChartArrayData", this.mapChartArrayData);
  };

  //get update date
  getLastUpdateDate = async () => {
    this.updateDateObs = await this.getAllCountryCornovirusDataObs.data
      .statistic_taken_at;
  };

  //getAllCountryCornovirusData
  getAllCountryCornovirusData = () => {
    let get = axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df"
      }
    }).then(response => {
      this.getAllCountryCornovirusDataObs = response;

      return response;
    });
    //console.log(get);
    return get;
  };

  //get countryinfo - population, coord, capital, etc
  getAllCountryGeneralData = async countryName => {
    //console.log("country_name", countryName);
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
        //console.log("rp ", rp);

        let population = rp.data[0].population;
        let region = rp.data[0].region;
        let lat = rp.data[0].latlng[1];
        let lon = rp.data[0].latlng[0];
        let capital = rp.data[0].capital;
        let coord = [lat, lon];
        this.citiesDataArrayObs.push({
          markerOffset: -5,
          xmarkerOffset: -5,
          name: rp.data[0].name,
          coordinates: coord,
          region: region,
          population: population,
          capital: capital
        });

        return rp;
      })
      .catch(function(error) {
        console.log(
          "Error notification! get all general data, store getAllCountryGeneralData function",
          countryName
        );
        //this.errorDataCountry.push(countryName);
        return Promise.reject(error);
      });
    // return getCountryData;
  };

  //("get cornovirus data")
  getCoronaVirusData = async () => {
    //await this.getAllCountryCornovirusData();
    let array = this.getAllCountryCornovirusDataObs.data.countries_stat;
    let countryNameWithCornovirusLenth = array.length;
    console.log(
      "this.countryNameWithCornovirus ",
      this.getAllCountryCornovirusDataObs.data.countries_stat
    );
    for (let i = 0; i < countryNameWithCornovirusLenth; i++) {
      let country = this.getAllCountryCornovirusDataObs.data.countries_stat[i]
        .country_name;
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
        country === "Turks and Caicos Islands" ||
        country === "St. Vincent Grenadines"
      ) {
        // console.log(country);
        this.errorDataCountry.push(country);
      } else {
        this.getAllCountryGeneralData(country);
      }
    }
    console.log(
      "response res getAllCountryGeneralData",
      this.citiesDataArrayObs
    );
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
        //console.log("Cornovirus response ", this.getCoronaVirusDataArray);
        //console.log(
        // "Cornovirus getCoronaVirusDataArray ",
        //  this.getCoronaVirusDataArray
        //  );
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
        this.getSingleCountryInfoF();
        console.log("Country data ", res);
      });
  };

  //Get single contry info coord/population
  getSingleCountryInfoF = () => {
    let array = this.citiesDataArrayObs;
    let arraySingle = [];
    let arrayResLengthInfo = array.length;
    //console.log("array single ", array);
    for (let i = 0; i < arrayResLengthInfo; i++) {
      if (this.citiesDataArrayObs[i].name === "Portugal") {
        arraySingle.push(this.citiesDataArrayObs[i]);
      }
    }
    this.getSingleCountryInfo = arraySingle;
    //return this.getSingleCountryInfo;
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

  extData = async () => {
    this.loadingSingularPage = true;
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

  userLanguage = () => {
    let userLang = navigator.language || navigator.userLanguage;

    console.log("coronavirus componet ", userLang);
  };
}

decorate(Store, {
  //new Observables
  getAllCountryCornovirusDataObs: observable,
  countryNameWithCornovirus: observable,
  //Old

  getSingluarCountryData: action,
  userLanguage: action,
  //getSingleCountryInfo: action,
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
  getSingleCountryInfo: observable,
  generalCountryCovidData: observable,
  generalCountryCovidDataDate: observable,
  updateDateObs: observable,
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
