import './App.css'

import { useCallback, useEffect } from 'react';

import NumberBlock from './NumberBlock'
import useGameLogic from './useGameLogic';
import { useKeyboard } from './useKeyboard';
import useState from 'react-usestateref';
import { useSwipeable } from 'react-swipeable';

function App() {

  const { generateInitialBlockArrayAndSelectedIndex, handleLeftArrow, handleRightArrow, handleSelectionButton } = useGameLogic();

  const [blockArray, setBlockArray, blockArrayRef] = useState([]);
  const [selectedBlockIndex, setSelectedBlockIndex, selectedBlockIndexRef] = useState(0);
  const [selected, setSelected, selectedRef] = useState(false);
  const [gameStarted, setGameStarted, gameStartedRef] = useState(false);



  const updateGameState = ({ blockArray, selectedBlockIndex }) => {
    setBlockArray(blockArray);
    setSelectedBlockIndex(selectedBlockIndex);
  }

  const onRightArrow = () => {
    const newGameState = handleRightArrow(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
    updateGameState(newGameState);
  }

  const onLeftArrow = () => {
    const newGameState = handleLeftArrow(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
    updateGameState(newGameState);
  }

  const onSelectionButton = () => {
    const newGameState = handleSelectionButton(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
    setSelected(newGameState.selected);
    updateGameState(newGameState);
  }


  useKeyboard({
    onKeyPressed: useCallback(() => {
      setGameStarted(true);
    }, [setGameStarted])
  });

  useKeyboard({
    key: "ArrowRight",
    onKeyPressed: onRightArrow
  });

  useKeyboard({
    key: "ArrowLeft",
    onKeyPressed: onLeftArrow
  });

  useKeyboard({
    key: "s",
    onKeyPressed: onSelectionButton
  });

  useSwipeable({
    onSwipedLeft: onLeftArrow,
    onSwipedRight: onRightArrow,
    onTap: onSelectionButton,
  });





  useEffect(() => {
    const { blockArray, selectedBlockIndex } = generateInitialBlockArrayAndSelectedIndex();
    updateGameState({ blockArray, selectedBlockIndex });
  }, [])




  return (
    <>
      <span className='instructions' hidden={gameStarted}>move left: ← move right: → select and drop: S</span>
      {/* <span>Timer { }</span> */}
      <div className='flex'>
        {blockArray.map((numbers, index) => (
          <NumberBlock
            key={index}
            numbers={numbers}
            selected={selectedBlockIndex == index && selected}
            hovered={selectedBlockIndex == index && !selected}>
          </NumberBlock>
        ))}
      </div>
    </>
  )
}

export default App
