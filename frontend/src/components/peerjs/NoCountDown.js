import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import '../css/Timer.css';


function NoCountDown({start, clickNext}) {

  const [key, setKey] = useState(0);


  function renderTime ({  }) {
  
  
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
          strokeLinecap= {['square']}
          trailColor= {['#B0AAE3']}
          rotation={['counterclockwise']}
          key={key}
          isPlaying 
          size={300}
          duration={5}
          colors={['#40dac7']}
          colorsTime={[30,28,27,26,25,24,23,22]}
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
