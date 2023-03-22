import Doors from './doors'

const Dungeon = ({ dispatch, dungeon, gameState }) => {
  const { path, segments } = dungeon

  const [lastSegmentId] = path.slice(-1)
  const currentSegment = segments[lastSegmentId]

  return (
    <>
      <h2>{currentSegment.description}</h2>

      <Doors
        dispatch={dispatch}
        doors={currentSegment.doors}
        gameState={gameState}
        segmentId={lastSegmentId}
      />

      {path.length > 1
        ? (
          <button
            onClick={() => {
              dispatch({ type: 'DUNGEON.BACK' })
            }}
          >
            Voltar
          </button>
        ) : null
      }
    </>
  )
}

export default Dungeon
