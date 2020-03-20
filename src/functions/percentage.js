import checkIfNumber from "./checkIfNumber";

const percentage = (a, b) => {
  let f = checkIfNumber(a);
  let g = checkIfNumber(b);
  let c = (g * 100) / f;
  let h = c.toFixed(2);
  return h;
};

export default percentage;
