"use client"
import { useState } from "react"
import { useAtom } from "jotai"
import { gameOverAtom, stageAtom } from "./gameAtoms"
import WinnerScreen from './WinnerScreen'

const GameBoard = ({ currentSongTitle, currentArtistName, currentArtistImage, currentSongReleaseDate }) => {
    // const [level, setLevel] = useState(1)
    const [stage, setStage] = useAtom(stageAtom)
    const stageSeconds = [1, 2, 4, 7, 11, 16]

    // add: score tracker
    // const [currentScore, setCurrentScore] = useState(0)
    const score = [600, 500, 400, 300, 200, 100]
    const currentScore = score[stage - 1]
    // const [highScore, setHighScore] = useState(0)

    const [gameIsOver, setGameIsOver] = useAtom(gameOverAtom)
    const [gameOutcome, setGameOutcome] = useState('')

    const [guesses, setGuesses] = useState([
        {
            number: 1,
            value: ''
        }, {
            number: 2,
            value: ''
        }, {
            number: 3,
            value: ''
        }, {
            number: 4,
            value: ''
        }, {
            number: 5,
            value: ''
        }, {
            number: 6,
            value: ''
        }
    ])

    guesses.forEach(guess => {
        if (guess.number < stage && guess.value.length === 0) {
            guess.value = 'Skipped'
        }
    })

    const gameOver = (outcome) => {
        setGameIsOver(true)
        setGameOutcome(outcome)
    }

    // fix: no empty guess, no repeat guess
    // add: guess suggestions
    const compareGuess = (event) => {
        event.preventDefault()
        const inputValue = event.target.elements.guess.value

        if (stage < 6) {
            if (inputValue.toLowerCase() === currentSongTitle.toLowerCase()) {
                gameOver('won')
            } else {
    
                const allGuesses = guesses
    
                const updatedGuess = allGuesses.find(guess => guess.number === stage)
                updatedGuess.value = inputValue
                
                setGuesses([...allGuesses])
                setStage(prev => prev + 1)
    
            }
        } else if (stage === 6) {
            const allGuesses = guesses
    
            const updatedGuess = allGuesses.find(guess => guess.number === stage)
            updatedGuess.value = inputValue
            
            setGuesses([...allGuesses])
            gameOver('lost')
        }
    }

    return (
        <div className="game">
            <div className="game__inner">
                {gameIsOver ? 
                    <WinnerScreen
                        outcome={gameOutcome}
                        seconds={stageSeconds[stage - 1]}
                        image={currentArtistImage}
                        title={currentSongTitle}
                        name={currentArtistName}
                        release={currentSongReleaseDate.slice(0, 4)}
                    ></WinnerScreen> : 
                    <>
                        <div className="game__score">
                            <div>Song: 1/10</div>
                            <div>Score: {currentScore}</div>
                            <div>High Score: 0</div>
                        </div>
                        <form className='game__guesser' action="" onSubmit={(e) => compareGuess(e)}>
                            <input type="text" name="guess" placeholder='Guess the song title'/>
                        </form>
                        <div className="game__guesses">
                            {guesses.map(({ number, value }) => <div key={number}>{number}. {value}</div>)}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default GameBoard