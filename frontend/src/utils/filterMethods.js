
import { priorityMapping } from "./utils"


const priorityTags =['Low', 'Medium', 'High']
const priorityFilterName='priority'


function priorityFilter(selectedPriorities) {
    const intSelectedPriorities = selectedPriorities.map((selectedPriority) => priorityMapping.stringToInt[selectedPriority] )
    console.log(this)
    return this.filter((task) => intSelectedPriorities.includes(task.priority))
    
}

const statusTags = ['Not started', 'In progress', 'Done']
const statusFilterName='status'

function statusFilter(selectedStatuses){
    return this.filter((task) => selectedStatuses.includes(task.status))
}

function count(cond) {
   return this.filter(cond).length
}


Array.prototype.priorityFilter = priorityFilter
Array.prototype.statusFilter = statusFilter
Array.prototype.count = count


export { priorityFilterName, priorityTags, statusTags, statusFilterName}