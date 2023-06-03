import "./Qs.css";
import Time from "./main/time/Time";
import qBase from "./../../../qBase.json";
import { useState } from "react";

let amount = 0;
let numberOfCorrect = 0;
const numbersForQuestions = Array.from({ length: 20 }, (v, i) => ++i);
const numbersForButtons = [0, 1, 2, 3];
let listOfAnswers = randomizeAnswers(numbersForButtons);
let listOfQuestions = randomizeAnswers(numbersForQuestions)

function randomizeAnswers(usedList) {
  let randomizedList = [];
  let iterations = usedList.length
  let numbersList = Array.from(usedList);
  for (let i = 0; i < iterations; i++) {
    randomizedList.push(numbersList.splice(Math.floor(Math.random() * numbersList.length), 1)[0]);
  }
  return randomizedList;
}

function Qs(props) {
  const [currentQuestion, setCurrentQuestion] = useState(listOfQuestions[amount]);
  const [countDown, setCountDown] = useState(30);
  const [time, setTime] = useState(true);
  const showTime = () => {
    setTime(!time);
  };
  const handleTime = (newTime) => {
    setCountDown(newTime);
  };

  let handleRestart = () => {
    amount = 0;
    numberOfCorrect = 0;
    listOfAnswers = randomizeAnswers(numbersForButtons);
    listOfQuestions = randomizeAnswers(numbersForQuestions)
    setCurrentQuestion(listOfQuestions[amount]);
    document.querySelector(".Buttons").style.display = "flex";
    showTime();
    document.querySelector(".questionName").textContent = "Математика";
    document.querySelector(".results").style.display = "none";
    document.querySelector(".question").style.display = "";
    document.querySelector(".description").style.display = "";
    document.querySelector(".description-wrapper").style.display = "";
    document.querySelector(".restart-button").style.display = "none";
  };

  let questionChange = function () {
    if (amount < numbersForQuestions.length - 1) {
      amount++;
      setCurrentQuestion(listOfQuestions[amount]);
    } else {
      document.querySelector(".Buttons").style.display = "none";
      showTime();
      document.querySelector(".questionName").textContent = "Результаты";
      document.querySelector(
        ".results"
      ).textContent = `${props.userData.userName} из ${props.userData.userClass}, вы ответили на ${numberOfCorrect} из ${listOfQuestions.length} вопросов правильно.`;
      document.querySelector(".results").style.display = "";
      document.querySelector(".question").style.display = "none";
      document.querySelector(".description").style.display = "none";
      document.querySelector(".description-wrapper").style.display = "none";
      document.querySelector(".restart-button").style.display = "";
    }
  };

  const handleButtonClick = (buttonId) => {
    let a = document.getElementById(buttonId).textContent;
    let base = qBase["M"][`${currentQuestion}`]["answers"];
    //+correct
    for (let i = 0; i < 4; i++) {
      if (a === base[i]["name"] && base[i]["correct"]) {
        numberOfCorrect++;
        break;
      }
    }
    listOfAnswers = randomizeAnswers(numbersForButtons);
    questionChange();
    setCountDown(30);
  };

  const handleChildUpdate = () => {
    questionChange();
  };

  return (
    <div className="Qs">
      <div className="Main">
        <div className="Title">
          <h1 className="questionName">Математика</h1>
          {time && (
            <Time
              onChildUpdate={handleChildUpdate}
              onChange={handleTime}
              init={countDown}
            />
          )}
        </div>
        <div className="Text">
          <p className="results" style={{ display: "none" }}></p>
          <h3 className="question">Вопрос {amount + 1} из {listOfQuestions.length}</h3>
          <div className="description-wrapper">
            <h2 className="description">
              {qBase["M"][`${currentQuestion}`]["description"] || " "}
            </h2>
          </div>
        </div>
        <button
          className="restart-button"
          onClick={handleRestart}
          style={{ display: "none" }}
        >
          Попытаться снова
        </button>
      </div>
      <div className="Buttons">
        <div className="ButtonRow">
          <div className="Button">
            <button
              onClick={() => {
                handleButtonClick(0);
              }}
              id="0"
              className="inner-button"
            >
              {
                qBase["M"][`${currentQuestion}`]["answers"][listOfAnswers[0]][
                  "name"
                ]
              }
            </button>
          </div>
          <div className="Button">
            <button
              onClick={() => {
                handleButtonClick(1);
              }}
              id="1"
              className="inner-button"
            >
              {
                qBase["M"][`${currentQuestion}`]["answers"][listOfAnswers[1]][
                  "name"
                ]
              }
            </button>
          </div>
        </div>
        <div className="ButtonRow">
          <div className="Button">
            <button
              onClick={() => {
                handleButtonClick(2);
              }}
              id="2"
              className="inner-button"
            >
              {
                qBase["M"][`${currentQuestion}`]["answers"][listOfAnswers[2]][
                  "name"
                ]
              }
            </button>
          </div>
          <div className="Button">
            <button
              onClick={() => {
                handleButtonClick(3);
              }}
              id="3"
              className="inner-button"
            >
              {
                qBase["M"][`${currentQuestion}`]["answers"][listOfAnswers[3]][
                  "name"
                ]
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qs;
