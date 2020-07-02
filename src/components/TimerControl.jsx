import React from 'react'

const TimerControl = props => {
    return <div className="timers">
      <h2 id={props.timerId}>{props.timerTitle}</h2>
      <div className="controls">
        <button onClick={props.onClick} id={props.minusId} value="-">-</button>
        <span id={props.lengthId}>{props.length}</span>
        <button onClick={props.onClick} id={props.plusId} value="+">+</button>
      </div>
    </div>
}


export default TimerControl