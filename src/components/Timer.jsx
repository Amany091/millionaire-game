import React, { useEffect, useState } from 'react'

export default function Timer({setStop, questionNumber, timer, setTimer}) {
    // const [timer, setTimer] = useState(30)

    useEffect(() => {
        if (timer === 0) return setStop(true)
        
        let interval= setInterval(() => {
            setTimer((prev) => prev -1)
        }, 1000);

        return () => clearInterval(interval) //cleanup on unmount
        
    }, [setStop, timer])
    
    // get timer back when move to a new question
    useEffect(() => {
        setTimer(50)
    },[questionNumber])

    return timer;
}
