import { observable, action, decorate, computed, runInAction } from "mobx";

class GetBrowserLanguageStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  userLanguage = () => {
    this.userLang = navigator.language || navigator.userLanguage;
    console.log("coronavirus componet ");
  };

  //**END Class */
}

decorate(GetBrowserLanguageStore, {
  //Observables
  userLang: observable,
  //Actions
  userLanguage: action
});

export default new GetBrowserLanguageStore();
