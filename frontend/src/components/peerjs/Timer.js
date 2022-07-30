import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.css";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer-response">답변 해주시기 바랍니다</div>;
  }

  return (
    <div className="timer">
      <div className="text"> 답변 준비 시간
</div>
      <div className="value">{remainingTime}초</div>
      <div className="text">남았습니다</div>
    </div>
  );
};


function Timer() {
  const [key, setKey] = useState(0);
  return (
    <div className="timer-container">
      <div className="timer-header">
      </div>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          key={key}
          isPlaying
          size={300}
          duration={30}
          colors={['#40dac7', '#ef42ff', '#40dac7', '#ef42ff']}
          colorsTime={[30,20, 10, 0]}
          onComplete={() => [true, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="button-wrapper">
        <button onClick={() => setKey(prevKey => prevKey + 1)}>
          Restart Timer
        </button>
      </div>
    </div>
      );
}

export default Timer
