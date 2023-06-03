import "./Time.css";
import React, { useEffect } from "react";

function Time(props) {
  let time = props.init;
  let changeTime = props.onChange

  useEffect(() => {
    let interval = setInterval(() =>{
    changeTime(time - 1)
    if (time <= 1) {
      changeTime(30)
      props.onChildUpdate()
    }
  }, 1000)
  return () => {
    clearInterval(interval);
  };
  })
  
  return (
    <div className="Time">
      <h2 className="countdown">{time}</h2>
    </div>
  );
}

export default Time;
