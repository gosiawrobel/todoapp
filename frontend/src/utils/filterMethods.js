import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { priorityMapping } from "./utils"

dayjs.extend(weekOfYear)

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


const timeTags = ['All', 'Today', 'Week']
const timeFilterName='period'

function timeFilter(selectedTime){
    if (selectedTime.length === 0){
        return this
    }

    const currentDate = new Date()

    switch (selectedTime[0]) {
        case 'All':
            return this
        case 'Today':
            return this.filter((task) => {
                const taskDate = new Date(task.endTime)
                return taskDate.getDay() === currentDate.getDay() && taskDate.getFullYear() === currentDate.getFullYear()}
                )
        case 'Week':
            return this.filter((task) => {
                const taskDate = new Date(task.endTime)
                return dayjs(taskDate).week() === dayjs(currentDate).week() && taskDate.getFullYear() === currentDate.getFullYear()}
                )
        default:
            return this
    }
}

Array.prototype.priorityFilter = priorityFilter
Array.prototype.statusFilter = statusFilter
Array.prototype.count = count
Array.prototype.timeFilter = timeFilter


export { priorityFilterName, priorityTags, statusTags, statusFilterName, timeTags, timeFilterName }