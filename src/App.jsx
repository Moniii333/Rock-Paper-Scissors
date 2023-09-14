import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userChoice, setUserChoice] = useState('rock')
  const [computerChoice, setComputerChoice] = useState('rock')
  const [userPoints, setUserPoints] = useState(0)
  const [computerPoints, setComputerPoints] = useState(0)
  const [turnResults, setTurnResults] = useState(null)
  const [result, setResult] = useState('Play to see if you can beat the computer!')
  const [gameOver, setGameOver] = useState(false)

  const choices = ['rock', 'paper', 'scissors']

  const handleOnClick = (choice) => {
    setUserChoice(choice)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userChoice + computerChoice

    if(userPoints <= 4 && computerPoints <= 4) {
      if(comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper') {
        const updatedUserPoints = userPoints + 1
        setUserPoints(updatedUserPoints)
        setTurnResults('You got a point!')
        if(updatedUserPoints === 5) {
          setGameOver(true)
          setResult('You win!')
        }
      }
      if(comboMoves === 'scissorsrock' || comboMoves === 'rockpaper' || comboMoves === 'paperscissors') {
        const updatedComputerPoints = computerPoints + 1
        setComputerPoints(updatedComputerPoints)
        setTurnResults('Computer wins this round!')
        if(updatedComputerPoints === 5) {
          setGameOver(true)
          setResult('Computer wins game!')
        }
      }  
      if(comboMoves === 'rockrock' || comboMoves === 'paperpaper' || comboMoves === 'scissorsscissors') {
        setTurnResults('No points!')
      }
    }
  }, [userChoice, computerChoice])

  return (
    <div className='App'>
      <h1 className='heading'>Rock, Paper, Scissors!</h1>
      <div className='score'>
        <h2>User Points: <span className='user-points'> {userPoints} </span></h2>
        <h2>Computer Points: <span className='computer-points'> {computerPoints} </span></h2>
      </div>
      <div className='choices'>
        <div className='choice-user'>
          {/* note for the src can use template literals cause img name is same as choice */}
          <img className='user-hand' src={`./images/${userChoice}.png`} />
        </div>
        <div className='choice-computer'>
          <img className='computer-hand' src={`./images/${computerChoice}.png`} />
        </div>
      </div>

      <div className='button-div'>
        {choices.map((choice, index) => (
          <button className='button' key={index} onClick={() => handleOnClick(choice)} disabled={gameOver}>
            {choice}
          </button>
        ))}
      </div>

      <div className='result'>
        <h2>Turn Results: {turnResults}</h2>
        <h2>Final Results: {result}</h2>
      </div>

          {/* game over button only shows conditionally when game is completed */}
      <div className='button-div'>
        {gameOver && 
          <button className='button' onClick={() => reset()}> Restart Game?

          </button>
        }
      </div>
    </div>
  )
}

export default App
