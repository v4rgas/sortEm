import './App.css'

import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { useCallback, useEffect } from 'react';

import NumberBlock from './NumberBlock'
import Time from './Time';
import useGameLogic from './useGameLogic';
import { useKeyboard } from './useKeyboard';
import useState from 'react-usestateref';
import { useSwipeable } from 'react-swipeable';

function App() {

  const { generateInitialBlockArrayAndSelectedIndex, handleLeftArrow, handleRightArrow, handleSelectionButton, isGameFinished, handleGameFinished } = useGameLogic();

  const [blockArray, setBlockArray, blockArrayRef] = useState([]);
  const [selectedBlockIndex, setSelectedBlockIndex, selectedBlockIndexRef] = useState(0);
  const [selected, setSelected, selectedRef] = useState(false);
  const [gameStarted, setGameStarted, gameStartedRef] = useState(false);






  const updateGameState = ({ blockArray, selectedBlockIndex }) => {
    setBlockArray(blockArray);
    setSelectedBlockIndex(selectedBlockIndex);
    if (isGameFinished(blockArray)) {
      console.log('Game finished');
      setGameStarted(false);
      handleGameFinished();
    }
    console.log(isGameFinished(blockArray));
  }

  const onRightArrow = () => {
    setGameStarted(true)
    const newGameState = handleRightArrow(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
    updateGameState(newGameState);
  }

  const onLeftArrow = () => {
    setGameStarted(true)
    const newGameState = handleLeftArrow(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
    updateGameState(newGameState);
  }

  const onSelectionButton = () => {
    setGameStarted(true)
    const newGameState = handleSelectionButton(blockArrayRef.current, selectedBlockIndexRef.current, selectedRef.current);
    setSelected(newGameState.selected);
    updateGameState(newGameState);
  }


  // useKeyboard({
  //   onKeyPressed: useCallback(() => {
  //     setGameStarted(true);
  //   }, [setGameStarted])
  // });

  useKeyboard({
    key: "ArrowRight",
    preventRepeat: true,
    onKeyPressed: onRightArrow
  });

  useKeyboard({
    key: "ArrowLeft",
    preventRepeat: true,
    onKeyPressed: onLeftArrow
  });

  useKeyboard({
    key: "s",
    preventRepeat: true,
    onKeyPressed: onSelectionButton
  });

  useKeyboard({
    key: "r",
    preventRepeat: true,
    onKeyPressed: () => { window.location.reload() }
  });

  const { ref } = useSwipeable({
    onTouchStartOrOnMouseDown: () => setGameStarted(true),
    onSwipedLeft: onLeftArrow,
    onSwipedRight: onRightArrow,
    onTap: onSelectionButton,
  });

  useEffect(() => {
    ref(document);
    return () => {
      ref({});

    }
  })




  useEffect(() => {
    const { blockArray, selectedBlockIndex } = generateInitialBlockArrayAndSelectedIndex();
    updateGameState({ blockArray, selectedBlockIndex });
  }, [])




  return (
    <>
      <MobileOnlyView>
        <span className='instructions' hidden={gameStarted}>
          Move left: swipe left; <br />
          Move right: swipe right; <br />
          Select and drop: tap
        </span>
      </MobileOnlyView>

      <BrowserView>
        <span className='instructions' hidden={gameStarted}>
          Move left: ← <br />
          Move right: → <br />
          Select and drop: S <br />
          Restart: R
        </span>
      </BrowserView>

      <Time started={gameStarted} paused={!gameStarted}></Time>



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
