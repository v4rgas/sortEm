import './App.css'

import { useCallback, useEffect } from 'react';

import NumberBlock from './NumberBlock'
import useGameLogic from './useGameLogic';
import { useKeyboard } from './useKeyboard';
import useState from 'react-usestateref';

function App() {

  const { generateInitialBlockArrayAndSelectedIndex, moveSelectedBlockRight, joinAdjacentBlocks, moveSelectedBlockLeft, handleLeftArrow, handleRightArrow, handleSelectionButton } = useGameLogic();

  const [blockArray, setBlockArray, blockArrayRef] = useState([]);
  const [selectedBlockIndex, setSelectedBlockIndex, selectedBlockIndexRef] = useState(0);
  const [selected, setSelected, selectedRef] = useState(false);

  const updateGameState = ({ blockArray, selectedBlockIndex }) => {
    setBlockArray(blockArray);
    setSelectedBlockIndex(selectedBlockIndex);
  }

  useKeyboard({
    key: "ArrowRight",
    onKeyPressed: () => {
      const newGameState = handleRightArrow(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
      updateGameState(newGameState);
    }
  });

  useKeyboard({
    key: "ArrowLeft",
    onKeyPressed: () => {
      const newGameState = handleLeftArrow(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
      updateGameState(newGameState);
    }
  });

  useKeyboard({
    key: "s",
    onKeyPressed: () => {
      const newGameState = handleSelectionButton(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
      setSelected(newGameState.selected);
      updateGameState(newGameState);
    }
  });




  useEffect(() => {
    const { blockArray, selectedBlockIndex } = generateInitialBlockArrayAndSelectedIndex();
    updateGameState({ blockArray, selectedBlockIndex });
  }, [])




  return (
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
  )
}

export default App
