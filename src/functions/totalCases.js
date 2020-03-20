import checkIfNumber from "./checkIfNumber";

const totalCases = data => {
  let totalCases = 0;
  let totalDeaths = 0;
  let totalCritical = 0;

  let tNewDeaths = 0;
  let tNewCases = 0;
  let tRecovers = 0;
  let tActiveCases = 0;
  let tTotalCasesPer1mPopulation = 0;

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
    let totalRecover = checkIfNumber(data[i].total_recovered);
    tRecovers = tRecovers + totalRecover;

    //new deaths
    let newDeaths = checkIfNumber(data[i].new_deaths);
    tNewDeaths = tNewDeaths + newDeaths;

    //new cases
    let newCases = checkIfNumber(data[i].new_cases);
    tNewCases = tNewCases + newCases;

    //active_cases
    let activeCases = checkIfNumber(data[i].active_cases);
    tActiveCases = tActiveCases + activeCases;

    // total total_cases_per_1m_population
    let totalCasesPer1mPopulation = checkIfNumber(
      data[i].total_cases_per_1m_population
    );
    tTotalCasesPer1mPopulation =
      tTotalCasesPer1mPopulation + totalCasesPer1mPopulation;
  }
  return {
    totalCases,
    totalDeaths,
    totalCritical,
    tNewDeaths,
    tNewCases,
    tRecovers,
    tActiveCases,
    tTotalCasesPer1mPopulation
  };
};

export default totalCases;
