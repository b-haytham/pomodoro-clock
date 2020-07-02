import React, { Component } from 'react';

import Timer from './components/Timer'
import TimerControl from './components/TimerControl'

import './App.css';

const audio = document.getElementById('beep')

class App extends Component {
  constructor(props){
    super(props)
    this.interval = undefined
    this.state = {
      breakLength: 5,
      sessionLength:25,
      timer: 1500,
      timerState: 'off',
      timerType: 'Session',
    }
  }
  
  setBreak = (e) =>{
    const {timerType, timer, timerState, breakLength} = this.state
    const {value} = e.target
    if(timerState==='on') return
    
    if( value ==='-'){
      if(breakLength === 1) return
      this.setState({
        breakLength: breakLength - 1,
        timer: (timerType==='Break') ? timer - 60 : timer
      })
    }else{
      if(breakLength===60) return
      this.setState({
        breakLength: breakLength + 1,
        timer: (timerType==='Break' ) ? timer + 60 : timer
      })
    }
  }

  
  setSession = (e) =>{
    const {timerType, timerState ,timer, sessionLength} = this.state
    const {value} = e.target
    if(timerState==='on') return
    
    if( value ==='-'){
      if(sessionLength === 1) return
      this.setState({
        sessionLength: sessionLength - 1,
        timer: (timerType==='Session') ? timer - 60 : timer
      })
    }else{
      if(sessionLength === 60) return
      this.setState({
        sessionLength: sessionLength + 1,
        timer: (timerType==='Session') ? timer + 60 : timer
      })
    }
  }
  
  convertTime = ( ) => {
    const {timer} = this.state
    let minutes = Math.floor(timer/60)
    let seconds = timer % 60
    if(minutes < 10){
      minutes = `0${minutes}`
    }
    if(seconds < 10){
      seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
  }
  
  playStop=()=>{
    const {timerState} = this.state
    if(timerState === 'off'){
      this.setState({timerState: 'on'})
      this.interval = setInterval(()=>{
        const {timer, breakLength, sessionLength,timerType} = this.state
        if(timer === 0){
          this.setState({
            timerType: (timerType ==='Session') ? 'Break' : 'Session',
            timer: (timerType ==='Session') ? (breakLength * 60) : (sessionLength * 60)
          })
          audio.play()
        }else{
         this.setState({timer: timer - 1}) 
        }
      },1000)
    }else{
      this.setState({timerState: 'off'})
      clearInterval(this.interval)
    }
    
  }
  
  initialize=()=>{      
    this.setState({
      breakLength: 5,
      sessionLength:25,
      timer: 1500,
      timerState: 'off',
      timerType: 'Session',
    })
    clearInterval(this.interval)
    audio.pause()
    audio.currentTime = 0
  }
  
  render(){
    return <div style={{color: this.state.timer < 60 ? 'red' : null}} id="app">
      <h1>Pomodoro Clock with REACT</h1>
      <Timer 
        timerType={this.state.timerType}
        timeLeft={this.convertTime()}
        timerState={this.state.timerState}
        reset={this.initialize}
        playStop={this.playStop}
      />
      <div className="timer-controls">
        <TimerControl 
         timerId="break-label"
         timerTitle="Break Length"
         minusId="break-decrement"
         plusId="break-increment" 
         lengthId="break-length"
         length={this.state.breakLength} 
         onClick={this.setBreak} 
        />
         <TimerControl 
         timerId="session-label"
         timerTitle="Session Length"
         minusId="session-decrement"
         plusId="session-increment" 
         lengthId="session-length"
         length={this.state.sessionLength}
         onClick={this.setSession}  
        />
      </div>
      
    </div>
  }
}

export default App;
