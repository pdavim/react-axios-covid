/*exports a string 
of words into an array of words*/

const stringToArray = str => {
  return str.split(",");
  //  return str.split(/\s+/);
};

export default stringToArray;
