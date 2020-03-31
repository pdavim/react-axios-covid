import { observable, action, decorate, computed, runInAction } from "mobx";
import axios from "axios";
import { readString } from "@react-papaparse";

class GetCitiesMapStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.getAllCitiesData();
  }

  dataArray = [];
  weight = 45;

  getSingleCityMapData = city => {
    // access todoStore through the root store
    return this.rootStore.todoStore.todos.filter(todo => todo.author === city);
  };

  getAllCitiesData = async () =>{
    await this.mapchartData()
    await this.getObjectMapChartData()
    await getCityDataObs()

  }

  mapchartData = async (value) => {
    // citiesDataArrayObs has to be get from other store???
    const { value } = this;
    let array =[]
    const {   weight } = this;
    for (let i = 0; i < value.length; i++) {
      // console.log(this.citiesDataArrayObs[i]);
      array.push([
        value[i].coordinates[0],
        value[i].coordinates[1],
        weight
      ]);
    }
    return array
  };

  async get getObjectMapChartData (){
      this.mapChartArrayData =  this.dataArray;
  };

  async get getCityDataObs(){
    // getAllCountryGeneralDataArray get observable from other store
    
    this.citiesDataArrayObs = await this.getAllCountryGeneralDataArray
  };

  //**END Class */
}

decorate(GetVirusDataStore, {
  //Observables
  citiesDataArrayObs: observable,
  dataArray: observable,
  weight: observable,
  //Actions
  mapchartData:action,
  //Computed
  getObjectMapChartData:computed,
  getCityDataObs: computed
});

export default new GetCitiesMapStore();
