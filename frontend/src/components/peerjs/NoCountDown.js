import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import '../css/Timer.css';


function NoCountDown({ start, clickNext }) {
  const [key, setKey] = useState(0);

  function renderTime({ }) {
    return (
      <div className="timer">
        <div className="text"> 답변이 녹화되고 있습니다</div>
        <div className="value"></div>
        <div className="text"></div>
      </div>
    )

  };


  return (
    <div className="timer-container">
      <div className="timer-header">
      </div>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          trailColor={['#B0AAE3']}
          rotation={['counterclockwise']}
          key={key}
          isPlaying
          size={300}
          duration={40}
          colors={['#40dac7']}
          colorsTime={[]}
          onComplete={() => {
            return { shouldRepeat: true, delay: 0 }
          }}>
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="button-wrapper">
      </div>
    </div>
  );
}

export default NoCountDown
