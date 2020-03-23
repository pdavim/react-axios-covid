import { observable, action, decorate, computed } from "mobx";
//import { action,observable } from "mobx-react";
import { readString, CSVReader, readRemoteFile } from "react-papaparse";
import axios from "axios";
import CornovirusData from "../assets/data/coronaVirusData";
import { isArray } from "util";

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
    this.extData();
    await this.getCityCoordinates();
    this.storeCounterData();
    this.isLoading = false;
  };

  //("user browser language")

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
        this.getSingleCountryInfo();
        console.log("portugal data ", res[0]);
      });
  };

  //Get single contry info coord/population
  getSingleCountryInfo = () => {
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
    return this.getSingleCountryInfo;
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

    let location = "Portugal";

    //var csv is the CSV file with headers
    //headers from arrays
    let headersCountry = axios
      .get(csvurlConfirmed)
      .then(res => {
        let data = res.data;
        let papaCsv = readString(data, {});
        let array = papaCsv.data;
        // console.log("headers country ", array[0]);
        this.headersArrayCountry.push(array[0]);

        return this.headersArrayCountry;
      })
      .then(res => {
        // console.log("headersArrayCountry ", res);
      });

    //Conifirmed Cases
    const confirmedPerCountry = axios
      .get(csvurlConfirmed)
      .then(res => {
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
      })
      .then(res => {
        // console.log("locationSearchArrayConfirmed ", res);
      });

    //Deaths
    const deathPerCountry = axios
      .get(csvurlDeaths)
      .then(res => {
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
      })
      .then(res => {
        // console.log("locationSearchArrayDeath ", res);
      });
    //Recoverd
    const recoverdPerCountry = axios
      .get(csvurlRecoverd)
      .then(res => {
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
      })
      .then(resp => {
        // console.log("RecoverdPerCountry ", resp);
      });

    // console.log("data City ", this.locationSearchArrayDeath);
    //console.log("data City ", this.locationSearchArrayRecoverd);
    const getDataArray = async () => {
      this.loadingSingularPage = true;
      await recoverdPerCountry;
      await deathPerCountry;
      await confirmedPerCountry;
      await headersCountry;
      await createDataArray();
      await this.getSingluarCountryData();

      this.loadingSingularPage = false;
      return;
    };
    // console.log(getDataArray);
    const createDataArray = async () => {
      if (
        !recoverdPerCountry.length ||
        !deathPerCountry.length ||
        !confirmedPerCountry.length
      ) {
        console.log("no data", recoverdPerCountry);
        return;
      } else {
        console.log("data has arrived");
        this.objectCSSEGISandData = [
          await recoverdPerCountry,
          await deathPerCountry,
          await confirmedPerCountry,
          await headersCountry
        ];
        //  console.log("data Country ", this.objectCSSEGISandData);
      }
    };
    getDataArray();
  };

  userLanguage = () => {
    let userLang = navigator.language || navigator.userLanguage;

    console.log("coronavirus componet ", userLang);
  };
}

decorate(Store, {
  getSingluarCountryData: action,
  userLanguage: action,
  getSingleCountryInfo: action,
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
