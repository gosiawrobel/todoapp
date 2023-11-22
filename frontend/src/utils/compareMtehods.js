const priorityAscending = (a,b) => {
    if (a.priority > b.priority) return 1
    if (a.priority === b.priority) {
        if (a.dueDate > b.dueDate) return 1
        if (a.dueDate === b.dueDate) return 0
        if (a.dueDate < b.dueDate) return -1
    } 
    if (a.priority < b.priority ) return -1
}

const priorityDescending = (a,b) => -priorityAscending(a,b)

const dateAscending = (a,b) => {
    if (a.dueDate > b.dueDate) return 1
    if (a.dueDate === b.dueDate) {
        if (a.priority > b.priority) return 1
        if (a.priority === b.priority) return 0
        if (a.priority < b.priority) return -1
    } 
    if (a.dueDate < b.dueDate ) return -1
}

const dateDescending = (a,b) => -dateAscending(a,b)

const sortingMethodFromName = {
    "Priority ascending": priorityAscending,
    "Priority descending": priorityDescending,
    "Date ascending": dateAscending,
    "Date descending": dateDescending
}

const sortNames = ['Date ascending', 'Date descending','Priority ascending', 'Priority descending']

export { sortingMethodFromName, sortNames }