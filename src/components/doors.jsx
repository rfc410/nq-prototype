const debounce = (fn, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}

const LockedDoor = ({ dispatch, doorIndex, segmentId }) => (
  <button
    style={{ display: 'block', marginBottom: 8 }}
    onClick={debounce(() => {
      dispatch({ doorIndex, segmentId, type: 'DUNGEON.DOOR.UNLOCK' })
    })}
  >
    Destrancar porta
  </button>
)

const UncheckedDoor = ({ dispatch, doorIndex, segmentId }) => (
  <button
    style={{ display: 'block', marginBottom: 8 }}
    onClick={debounce(() => {
      dispatch({ doorIndex, segmentId, type: 'DUNGEON.DOOR.CHECK' })
    })}
  >
    Checar porta
  </button>
)

const UnlockedDoor = ({ dispatch, doorIndex, segmentId }) => (
  <button
    style={{ display: 'block', marginBottom: 8 }}
    onClick={debounce(() => {
      dispatch({ doorIndex, segmentId, type: 'DUNGEON.DOOR.OPEN' })
    })}
  >
    Abrir porta
  </button>
)

const Door = ({ dispatch, doorIndex, segmentId, status }) => {
  if (status === 'LOCKED') {
    return (
      <LockedDoor
        dispatch={dispatch}
        doorIndex={doorIndex}
        segmentId={segmentId}
      />
    )
  }

  if (status === 'UNCHECKED') {
    return (
      <UncheckedDoor
        dispatch={dispatch}
        doorIndex={doorIndex}
        segmentId={segmentId}
      />
    )
  }

  if (status === 'UNLOCKED') {
    return (
      <UnlockedDoor
        dispatch={dispatch}
        doorIndex={doorIndex}
        segmentId={segmentId}
      />
    )
  }
}

const DoorSegmentDescriber = ({ gameState, segmentId }) => {
  if (segmentId === null) {
    return <span style={{ color: 'red' }}>Caminho inexplorado.</span>
  }

  return (
    <span>Leva para: {gameState.dungeon.segments[segmentId].description}</span>
  )
}

const Doors = ({ dispatch, doors, gameState, segmentId }) => {
  if (doors.length === 0) {
    return null
  }

  return doors.map((door, index) => (
    <div
      key={index}
      style={{
        borderBottom: '1px solid #bbb',
        marginBottom: 8
      }}
    >
      <Door
        dispatch={dispatch}
        doorIndex={index}
        segmentId={segmentId}
        status={door.status}
      />

      <DoorSegmentDescriber gameState={gameState} segmentId={door.segment} />
    </div>
  ))
}

export default Doors
