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
  const [focusedBlockIndex, setfocusedBlockIndex, focusedBlockIndexRef] = useState(0);
  const [selected, setSelected, selectedRef] = useState(false);
  const [gameStarted, setGameStarted, gameStartedRef] = useState(false);






  const updateGameState = ({ blockArray, focusedBlockIndex }) => {
    setBlockArray(blockArray);
    setfocusedBlockIndex(focusedBlockIndex);
    if (isGameFinished(blockArray)) {
      console.log('Game finished');
      setGameStarted(false);
      handleGameFinished();
    }
    console.log(isGameFinished(blockArray));
  }

  const onRightArrow = () => {
    setGameStarted(true)
    const newGameState = handleRightArrow(blockArrayRef.current, focusedBlockIndexRef.current, selectedRef.current);
    updateGameState(newGameState);
  }

  const onLeftArrow = () => {
    setGameStarted(true)
    const newGameState = handleLeftArrow(blockArrayRef.current, focusedBlockIndexRef.current, selectedRef.current);
    updateGameState(newGameState);
  }

  const onSelectionButton = () => {
    setGameStarted(true)
    const newGameState = handleSelectionButton(blockArrayRef.current, focusedBlockIndexRef.current, selectedRef.current);
    setSelected(newGameState.selected);
    updateGameState(newGameState);
  }


  // useKeyboard({
  //   onKeyPressed: useCallback(() => {
  //     setGameStarted(true);
  //   }, [setGameStarted])
  // });

  useKeyboard({
    key: ["ArrowRight", 'L', 'l'],
    preventRepeat: true,
    onKeyPressed: onRightArrow
  });

  useKeyboard({
    key: ["ArrowLeft", 'H', 'h'],
    preventRepeat: true,
    onKeyPressed: onLeftArrow
  });

  useKeyboard({
    key: ["s", "S"],
    preventRepeat: true,
    onKeyPressed: onSelectionButton
  });

  useKeyboard({
    key: ["r", "R"],
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
    const { blockArray, focusedBlockIndex } = generateInitialBlockArrayAndSelectedIndex();
    updateGameState({ blockArray, focusedBlockIndex });
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
          Move left: ← or H <br />
          Move right: → or L<br />
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
            selected={focusedBlockIndex == index && selected}
            hovered={focusedBlockIndex == index && !selected}>
          </NumberBlock>
        ))}
      </div>
    </>
  )
}

export default App
