import React, { useEffect, useState } from 'react'
import useSound from 'use-sound'

import play from './../assets/src_sounds_play.mp3'
import correct from '../assets/src_sounds_correct.mp3'
import wrong from '../assets/src_sounds_wrong.mp3'

export default function Quiz({ data, questionNumber, setQuestionNumber, setStop }) {
  const [question, setQuestion] = useState(null)
  const [selectAnswer, setSelectAnswer] = useState(null)
  const [className, setClassName] = useState("answer")
  const [trueAnswerClassName, setTrueAnswerClassName] = useState("trueAnswer")
  const [beginGame] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)

  useEffect(() => {
    beginGame()
  }, [beginGame])

  // get the current question
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    if (questionNumber  > data.length) setStop(true);
  }, [data, questionNumber])

  const delay = ((callback, duration) => {
    setTimeout(() => {
      callback()
    }, duration)
  })

  const checkAnswer = (a) => {
    setSelectAnswer(a);
    setClassName("answer active")
    // check the correct answer
    delay(() => {
      setClassName(a.correct ? "answer correct" : "answer wrong")
    }, 1000)

    delay(() => {
      question?.answers.find(m =>  m.correct === true ? setClassName(" answer trueAnswer") : setClassName("answer"))
      
    },1000)

    // move to next question after animation is over
    delay(() => {
      if (a.correct) {
        correctAnswer()

        delay(() => {
          setQuestionNumber((prev) => prev + 1);
          
          setSelectAnswer(null)
        }, 1000)

      } else {
        delay(() => setStop(true), 1000)
        wrongAnswer()
      }
    }, 2000)
  }
  return (
    <div>
      <div className="quiz">
        <div className="question"> ${question?.question} </div>
        <div className="answers">
          {question?.answers.map((a, index) => (
            <div
            key={index}
            className={selectAnswer === a ? className : ` answer ${trueAnswerClassName}`}
              onClick={() => checkAnswer(a)}

            > ${a.text} </div>
          ))
          }

        </div>
      </div>
    </div>
  )
}
