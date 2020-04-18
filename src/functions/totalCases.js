import checkIfNumber from "./checkIfNumber";

const totalCases = (data) => {
  let totalCases = 0;
  let totalDeaths = 0;
  let totalCritical = 0;

  let tNewDeaths = 0;
  let tNewCases = 0;
  let tRecovers = 0;
  let tActiveCases = 0;
  let tTotalCasesPer1mPopulation = 0;
  let tdeaths_per_1m_population = 0;
  let ttests_per_1m_population = 0;
  let ttotal_tests = 0;

  let i = 0;

  for (i = 0; i < data.length; i++) {
    //total cases
    let x = checkIfNumber(data[i].cases);

    totalCases = totalCases + x;
    //total deaths
    let y = checkIfNumber(data[i].deaths);
    totalDeaths = totalDeaths + y;

    // total critical
    let z = checkIfNumber(data[i].serious_critical);
    totalCritical = totalCritical + z;

    //Total recovered
    //let w = checkIfNumber(data[i].total_recovered);
    if (data[i].total_recovered === "N/A") {
      console.log("not availabre", data[i].total_recovered);
      console.log("not availabre", data[i]);
      //data[i].total_recovered = 0;
      let x = 0;
      let totalRecover = checkIfNumber(x);
      tRecovers = tRecovers + totalRecover;
    } else {
      let totalRecover = checkIfNumber(data[i].total_recovered);
      tRecovers = tRecovers + totalRecover;
    }

    //new deaths
    let newDeaths = checkIfNumber(data[i].new_deaths);
    tNewDeaths = tNewDeaths + newDeaths;

    //new cases
    let newCases = checkIfNumber(data[i].new_cases);
    tNewCases = tNewCases + newCases;

    //active_cases
    let activeCases = checkIfNumber(data[i].active_cases);
    tActiveCases = tActiveCases + activeCases;

    //deaths_per_1m_population
    let deathPerMilion = checkIfNumber(data[i].deaths_per_1m_population);
    tdeaths_per_1m_population = tdeaths_per_1m_population + deathPerMilion;
    //test per million
    let testsPerMiliion = checkIfNumber(data[i].tests_per_1m_population);
    ttests_per_1m_population = ttests_per_1m_population + testsPerMiliion;

    //total_tests
    let totalTest = checkIfNumber(data[i].total_tests);
    ttotal_tests = ttotal_tests + totalTest;

    // total total_cases_per_1m_population
    let totalCasesPer1mPopulation = checkIfNumber(
      data[i].total_cases_per_1m_population
    );
    tTotalCasesPer1mPopulation =
      tTotalCasesPer1mPopulation + totalCasesPer1mPopulation;
  }

  let arrayHead = [
    "totalCases",
    "total deaths",
    "total critical",
    "new deaths",
    "new cases",
    "recovers",
    "ative cases",
    "total cases per 1m",
    "death per 1m",
    "tests per 1m",
    "total tests",
  ];

  return {
    totalCases,
    totalDeaths,
    totalCritical,
    tNewDeaths,
    tNewCases,
    tRecovers,
    tActiveCases,
    tTotalCasesPer1mPopulation,
    tdeaths_per_1m_population,
    ttests_per_1m_population,
    ttotal_tests,
    arrayHead,
  };
};

export default totalCases;
