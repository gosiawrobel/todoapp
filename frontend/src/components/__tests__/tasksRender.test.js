/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { useState } from 'react'
import { render, screen, cleanup, configure, fireEvent, getByLabelText, getByRole} from '@testing-library/react'
import AllTasks from '../AllTasks'
import { LocalizationProvider } from '@mui/x-date-pickers'
import TaskDetails from '../TaskDetails'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const tasks = [
    {
        "id": 2304,
        "title": "Test1",
        "description": "Description1",
        "priority": 1,
        "dueDate": "2023-11-24 19:44",
        "status": "Not started",
        "email": "example@mail.xd",
        "reminderSent": false
    },
    {
        "id": 2305,
        "title": "Test2",
        "description": "Description2",
        "priority": 2,
        "dueDate": "2023-11-25 19:45",
        "status": "In progress",
        "email": "example@mail.xd",
        "reminderSent": false
    },
    {
        "id": 2307,
        "title": "Test4",
        "description": "Description4",
        "priority": 2,
        "dueDate": "2023-11-26 19:46",
        "status": "In progress",
        "email": "example@mail.xd",
        "reminderSent": false
    },
    {
        "id": 2306,
        "title": "Test3",
        "description": "Description3",
        "priority": 3,
        "dueDate": "2023-11-26 19:46",
        "status": "Done",
        "email": "example@mail.xd",
        "reminderSent": false
    }
]

configure({testIdAttribute: 'id'})
test('should render tasks', () => {
    configure({testIdAttribute: 'id'})
    configure({labelTextAttribute: 'aria-label'})
    
    render(<AllTasks tasks={tasks}/>)
    for (const task of tasks) {
        const taskElement = screen.getByTestId(task.id)
        expect(taskElement).toBeInTheDocument()
        expect(taskElement).toHaveTextContent(task.title)
        expect(taskElement).toHaveTextContent(task.dueDate)
    }
})

// test('should add new task', () => {
//     const TestCompnent = () => {
//         const [open,setOpen]=useState(true)
//         const [testTasks, setTestTasks]=useState([{"id": 2304,
//         "title": "Test1",
//         "description": "Description1",
//         "priority": 1,
//         "dueDate": "2023-11-24 19:44",
//         "status": "Not started",
//         "email": "example@mail.xd",
//         "reminderSent": false}])
//         return (
//            <LocalizationProvider dateAdapter={AdapterDayjs}><TaskDetails open={open} onClose={() => setOpen(false)} tasks={[testTasks]} selectedTaskId={0}/></LocalizationProvider>
//         )
//     }
//     render (<LocalizationProvider dateAdapter={AdapterDayjs}><TestCompnent/></LocalizationProvider>)
//     screen.getByLabelText('Title').click()
//     screen.getByLabelText('Title')
//     screen.getByLabel('Title').fill(tasks[1].title);
//     screen.getByLabel('Description').click();
//     screen.getByLabel('Description').fill(tasks[1].description);
//     screen.getByText('Medium').click();
//     screen.getByRole('option', { name: 'Medium' }).click();
//     screen.getByText('Not started').click();
//     screen.getByRole('option', { name: 'In progress' }).click();
//     screen.getByLabel('Email').click(tasks[1].email);
//     screen.getByPlaceholder('MM/DD/YYYY hh:mm').click();
//     screen.getByLabel('Choose date, selected date is').click();
//     screen.getByRole('gridcell', { name: '24' }).click();
//     screen.getByLabel('22 hours').click();
//     screen.getByLabel('18 minutes').click();
//     screen.getByRole('button').nth(2).click();

// })


