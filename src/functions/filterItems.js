//filter data fram an a given array over a given query

const filterItems = (arr, query) => {
  let queryLower = query.toLowerCase();
  //console.log("queryLower", queryLower);
  let dataCountry = arr.filter(item =>
    item.name.toLowerCase().includes(queryLower)
  );

  return dataCountry;
};

export default filterItems;

//example
//let array =["as","we","hs","td"]
//console.log("filterCountry ", filterItems(arrray, "s"));
//["as","hs"]
// let dataCountry = arr.filter(item => item.name.includes(queryLower));
