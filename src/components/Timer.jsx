import React from "react";
import { FaPlay ,FaPause} from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const Timer = (props) => {
  return (
    <div className="clock-wrapper">
      <h3 id="timer-label">{props.timerType}</h3>
      <div id="time-left">{props.timeLeft}</div>
      <div id="timer-action">
        <button onClick={props.playStop} id="start_stop">
          { props.timerState === 'off' ? <FaPlay /> : <FaPause/>}
        </button>
        <button onClick={props.reset} id="reset">
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
};

export default Timer;
