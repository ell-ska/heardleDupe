import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const stageAtom = atom(1)

export const gameStatusAtom = atom({
    gameOver: false,
    gameOutcome: '',
    finalScore: ''
})

export const statsAtom = atomWithStorage('stats', {
    totalScore: 0,
    highScore: 0,
    gamesPlayed: 0
})