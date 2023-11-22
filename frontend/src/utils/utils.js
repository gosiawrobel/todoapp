import  { COLORS } from './colors'

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
    'Done': COLORS.doneGreen,
    'In progress':COLORS.inProgress,
    'Not started': COLORS.notStarted,
}

  export { priorityMapping, statusColorMapping }