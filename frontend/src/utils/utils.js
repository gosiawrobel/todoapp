const priorityMapping = {
    stringToInt: {
      "Low": 1,
      "Medium": 2,
      "High": 3,
    },
    intToString: {
      1: "Low",
      2: "Medium",
      3: "High"
    }
  }

const statusColorMapping = {
    'Not started': '#91A6A6',
    'In progress':'#B19777',
    'Done': '#608172'
}

  export { priorityMapping, statusColorMapping }