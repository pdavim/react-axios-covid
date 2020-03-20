const checkIfNumber = e => {
  if (typeof e === "number") {
    return e;
  } else {
    let b = parseFloat(e.replace(/,/g, ""));
    return b;
  }
};

export default checkIfNumber;
