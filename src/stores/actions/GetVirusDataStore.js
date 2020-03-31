import { observable, action, decorate, computed, runInAction } from "mobx";

class GetVirusDataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  getSingleCityVirusData(city) {
    // access todoStore through the root store
    return this.rootStore.todoStore.todos.filter(todo => todo.author === city);
  }

  //**END Class */
}

decorate(GetVirusDataStore, {
  //Observables
  //Actions
});

export default new GetVirusDataStore();
