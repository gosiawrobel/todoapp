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
    'Done': '#6fa17d',
    'In progress':'#e7d07d',
    'Not started': '#9c4e4e',
}

  export { priorityMapping, statusColorMapping }