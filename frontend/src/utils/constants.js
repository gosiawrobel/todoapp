
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const paths = [
    { url: '/', name: 'Summary', icon:<SummarizeIcon/>,},
    { url: '/calendar', name: 'Calendar', icon: <CalendarTodayIcon/>,},
    { url: '/tasks_done', name: 'Tasks done', icon: <DoneAllIcon/>,},
    { url: '/tasks', name: 'All tasks', icon: <FormatListBulletedIcon/>}
]


export function pathNameFromUrl(url) {
    const foundPath = paths.find((path) => path.url == url)
    if (foundPath) {
        return foundPath.name
    } 
    return '404 Not found'
}