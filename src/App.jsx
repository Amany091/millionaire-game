
import React, { useState, useEffect } from "react";
import './App.css'

import Quiz from "./components/quiz";
import { data } from "./components/data";
import { moneyPyramid } from "./components/data"
import Timer from "./components/Timer";
import Start from "./components/Start";

const App = () => {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [stop, setStop] = useState(false);
    const [earned, setEarned] = useState("$ 0")
    const [username, setUsername] = useState(null)
    const [timer, setTimer] = useState(50)

    // get the money earned when stop value "true" 
    useEffect(() => {
        questionNumber  > data.length && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
    }, [moneyPyramid, questionNumber])

    return (
        <div className="app">
            {username ?
                <>
                    <div className="main">
                        {stop ?
                            <div className="lose ">
                                <h1 className="earned"> You Earned {earned} </h1>
                                <button className="btn btn-success" onClick={() => window.location.reload()}>Try Again</button>
                            </div> :
                            <>
                                <div className="top">
                                    <div className={timer < 10 ? "text-danger timer border-danger" : "text-success timer border-success"}>
                                        <Timer
                                            setStop={setStop}
                                            questionNumber={questionNumber}
                                            timer={timer}
                                            setTimer={setTimer} />
                                    </div>
                                </div>
                                <div className="bottom">
                                    <Quiz
                                        data={data}
                                        questionNumber={questionNumber}
                                        setQuestionNumber={setQuestionNumber}
                                        setStop={setStop} />
                                </div>
                            </>
                        }
                    </div>
                    <div className="pyramid">
                        <ul className="moneyList">
                            {moneyPyramid.map(m => (
                                <li key={m.id} className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                                    <span className="moneyLisItemNumber"> ${m.id} </span>
                                    <span className="moneyListItemAmount"> ${m.amount} </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
                : <Start setUsername={setUsername} />
            }




        </div>
    );
}

export default App;

