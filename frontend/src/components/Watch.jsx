import React, { useState, useEffect } from 'react'

function Watch() {
    const [date, setDate]=useState(new Date)

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {clearInterval(timer)
        }
    })
  return (
   <div className='watch'>
       <p className='watch-element clock'>{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
       <p className='watch-element date'>{date.toLocaleDateString()}</p>
   </div>
  )
}

export default Watch