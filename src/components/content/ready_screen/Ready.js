import "./Ready.css";


let userName;
let userClass;

function Ready(props) {
  const handleNameChange = (event) => {
    userName = event.target.value;
  };
  
  const handleClassChange = (event) => {
    userClass = event.target.value;
  };

  const clickReady = () => {
    let time = 3;
    document.querySelector(".Ready").innerHTML = "";
    let countdown = document.createElement("h2");
    countdown.classList.add("ready-time");
    countdown.textContent = time;
    document.querySelector(".Ready").append(countdown);
    props.handleUserData({
      userName,
      userClass,
    });

    let interval = setInterval(() => {
      time--;
      countdown.textContent = time;
      if (time < 1) {
        props.handleReady();
        clearInterval(interval);
      }
    }, 1000);
  };
  return (
    <div className="Ready">
      <h1 className="ready-title">Тест по математике</h1>
      <div className="input-wrapper">
        <input
          className="input input-name"
          type="text"
          onChange={handleNameChange}
          placeholder="Имя"
        />
        <input
          className="input input-class"
          type="text"
          onChange={handleClassChange}
          placeholder="Класс"
        />
      </div>
      <button className="ready-button" onClick={clickReady}>
        Начать
      </button>
      <p className="ready-description">
        Приветствуем вас в нашем тесте по математике! Укажите своё имя и номер класса с буквой. После, нажмите кнопку "Начать", и перед вами будут появляться вопросы. Всего 20 вопросов, время на ответ на каждый — 30 секунд. <br/> После прохождения теста вы увидите количество правильных ответов. При желании сможете пройти тест заново. Все вопросы из теста даются в случайном порядке.
      </p>
    </div>
  );
}

export default Ready;
