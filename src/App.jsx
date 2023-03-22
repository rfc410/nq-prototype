import { useEffect, useReducer } from 'react'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'

import Dungeon from './components/dungeon'

import d6 from './dices/d6'
import { CRYPT_SEGMENTS } from './dungeons/crypt'

import './App.css'

const gameReducer = (state, action) => {
  if (action.type === 'DUNGEON.BACK') {
    return produce(state, (draft) => {
      draft.dungeon.path.pop()
    })
  }

  if (action.type === 'DUNGEON.DOOR.CHECK') {
    const diceRoll = d6.roll()
    let door = null
    const { doorIndex, segmentId } = action

    if (diceRoll === 0) {
      door = {
          segment: null,
          status: 'UNLOCKED'
      }

      window.alert('Você caiu em uma armadilha.')

      const trapRoll = d6.roll()

      if (trapRoll === 0) {
        const mortalTrapRoll = d6.roll()

        if (mortalTrapRoll === 0) {
          window.alert(
            'Uma lâmina desce do teto partindo você ao meio.'
          )

          return produce(state, (draft) => {
            draft.character.hitPoints.current = 0

            draft.dungeon.segments[segmentId].doors[doorIndex] = door
          })
        }

        window.alert('Você escuta um clique, mas nada lhe acontece.')

        return produce(state, (draft) => {
          draft.dungeon.segments[segmentId].doors[doorIndex] = door
        })
      }

      if (trapRoll === 1) {
        window.alert('Um jorro de ácido cai sobre você. Perca 5 de vida.')

        return produce(state, (draft) => {
          draft.character.hitPoints.current -= 5

          draft.dungeon.segments[segmentId].doors[doorIndex] = door
        })
      }

      if (trapRoll === 2) {
        window.alert('Você acaba caindo em um fosso. Durante o tempo necessário para sair dele você acaba gastando uma tocha.')

        return produce(state, (draft) => {
          draft.character.torches -= 1

          draft.dungeon.segments[segmentId].doors[doorIndex] = door
        })
      }

      if (trapRoll === 3) {
        window.alert('Você é atingido por um dardo e perde 3 pontos de vida.')

        return produce(state, (draft) => {
          draft.character.hitPoints.current -= 3

          draft.dungeon.segments[segmentId].doors[doorIndex] = door
        })
      }

      window.alert('Você escuta um clique, mas nada lhe acontece.')

      return produce(state, (draft) => {
        draft.dungeon.segments[segmentId].doors[doorIndex] = door
      })
    }

    if ([1, 2].includes(diceRoll)) {
      window.alert('A porta está trancada.')

      door = {
        segment: null,
        status: 'LOCKED'
      }
    }

    if ([3, 4, 5].includes(diceRoll)) {
      window.alert('A porta está aberta.')

      door = {
          segment: null,
          status: 'UNLOCKED'
      }
    }

    return produce(state, (draft) => {
      draft.dungeon.segments[segmentId].doors[doorIndex] = door
    })
  }

  if (action.type === 'DUNGEON.DOOR.OPEN') {
    const diceRoll = d6.roll()
    const { doorIndex, segmentId } = action
    const id = uuidv4()
    const currentSegment = state.dungeon.segments[segmentId]

    if (currentSegment.doors[doorIndex].segment !== null) {
      return produce(state, (draft) => {
        draft.dungeon.path.push(currentSegment.doors[doorIndex].segment)
      })
    }

    const nextSegment = CRYPT_SEGMENTS[currentSegment.type][diceRoll]

    return produce(state, (draft) => {
      draft.dungeon.segments[segmentId].doors[doorIndex].segment = id

      draft.dungeon.path.push(id)

      draft.dungeon.segments[id] = {
        ...nextSegment,
        doors: Array.from(
          Array(nextSegment.doors))
            .map((_) => ({ segment: null, status: 'UNCHECKED' })
        )
      }
    })
  }

  if (action.type === 'DUNGEON.DOOR.UNLOCK') {
    let door = null
    const { doorIndex, segmentId } = action

    return produce(state, (draft) => {
      draft.character.torches -= 1

      draft.dungeon.segments[segmentId].doors[doorIndex].status = 'UNLOCKED'
    })
  }

  if (action.type === 'DUNGEON.START') {
    const { character, dungeon } = state
    const id = uuidv4()
    const startingSegment = CRYPT_SEGMENTS.STARTING_SEGMENT

    return produce(state, (draft) => {
      draft.character.torches -= 1

      draft.dungeon = {
        level: 0,
        path: [id],
        segments: {
          [id]: {
            ...startingSegment,
            doors: Array.from(
              Array(startingSegment.doors))
                .map((_) => ({ segment: null, status: 'UNCHECKED' })
            )
          }
        }
      }
    })
  }
}

const App = () => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    character: {
      hitPoints: {
        current: 10,
        total: 10
      },
      name: 'Conan the Barbarian',
      torches: 5
    },
    dungeon: null
  })

  useEffect(() => {
    console.log(JSON.stringify(gameState, null, 2))
  }, [gameState])

  if (gameState.character.torches === 0) {
    window.alert('As suas tochas acabaram e a escuridão lhe consome.')

    return (
      <>
        <h1>Você morreu!</h1>
        <button onClick={() => location.reload()}>Recomeçar</button>
      </>
    )
  }

  if (gameState.character.hitPoints.current <= 0) {
    return (
      <>
        <h1>Você morreu!</h1>
        <button onClick={() => location.reload()}>Recomeçar</button>
      </>
    )
  }

  return (
    <>
      <div>
        Character: {gameState.character.name}

        <span style={{ display: 'block' }}>
          Hit points: {gameState.character.hitPoints.current}/
          {gameState.character.hitPoints.total}
        </span>

        <span style={{ display: 'block' }}>
          Torches: {gameState.character.torches}
        </span>
      </div>

      {gameState.dungeon === null ? (
        <button onClick={() => dispatch({ type: 'DUNGEON.START' })}>
          Entrar na masmorra!
        </button>
      ) : (
        <Dungeon
          dispatch={dispatch}
          dungeon={gameState.dungeon}
          gameState={gameState}
        />
      )}

      {gameState.dungeon?.path.length === 1 && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => location.reload()}>Recomeçar do zero</button>
        </div>
      )}
    </>
  )
}

export default App
