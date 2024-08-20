import './App.css'

import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { useCallback, useEffect } from 'react';

import NumberBlock from './BaseGame/NumberBlock'
import Time from './Time';
import useApi from './useApi';
import useGameLogic from './BaseGame/useGameLogic';
import { useKeyboard } from './BaseGame/useKeyboard';
import { useNavigate } from 'react-router-dom';
import useState from 'react-usestateref';
import { useSwipeable } from 'react-swipeable';

function App() {

  const { getNumberOfOnlinePlayers } = useApi()
  const { generateInitialBlockArrayAndSelectedIndex, handleLeftArrow, handleRightArrow, handleSelectionButton, isGameFinished, handleGameFinished } = useGameLogic();

  const [blockArray, setBlockArray, blockArrayRef] = useState([]);
  const [focusedBlockIndex, setfocusedBlockIndex, focusedBlockIndexRef] = useState(0);
  const [selected, setSelected, selectedRef] = useState(false);
  const [gameStarted, setGameStarted, gameStartedRef] = useState(false);
  const [gameEnded, setGameEnded, gameEndedRef] = useState(false);
  const [onlinePlayerCount, setOnlinePlayerCount] = useState(1);
  const navigate = useNavigate();




  const goToLeaderboard = () => {
    navigate('/l');
  }

  const onNewGame = () => {
    setGameEnded(false);
    setGameStarted(false);
    updateGameState(generateInitialBlockArrayAndSelectedIndex());
  }

  const updateGameState = ({ blockArray, focusedBlockIndex }) => {
    setBlockArray(blockArray);
    setfocusedBlockIndex(focusedBlockIndex);
    if (isGameFinished(blockArray)) {
      console.log('Game finished');
      setGameEnded(true);
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
    onKeyPressed: onNewGame
  });

  useKeyboard({
    key: " ",
    preventRepeat: true,
    onKeyPressed: goToLeaderboard
  });

  const swipeHandlers = useSwipeable({
    onTouchStartOrOnMouseDown: () => setGameStarted(true),
    onSwipedLeft: onLeftArrow,
    onSwipedRight: onRightArrow,
    onTap: onSelectionButton,
  });

  const longSwipeHandlers = useSwipeable({
    onSwipedDown: onNewGame,
    onSwipedUp: goToLeaderboard,
    delta: 300
  });


  useEffect(() => {
    swipeHandlers.ref(document);
    longSwipeHandlers.ref(document);
    return () => {
      swipeHandlers.ref({});
      longSwipeHandlers.ref({});
    }
  })

  useEffect(() => {
    const { blockArray, focusedBlockIndex } = generateInitialBlockArrayAndSelectedIndex();
    getNumberOfOnlinePlayers().then((data) => {
      console.log(data);
      setOnlinePlayerCount(data.activeUsers);
    })

    updateGameState({ blockArray, focusedBlockIndex });
  }, [])




  return (
    <>
      <MobileOnlyView>
        <span className='instructions' hidden={gameStarted}>
          Move left: swipe left; <br />
          Move right: swipe right; <br />
          Select and drop: tap <br />
          Restart: long swipe down <br />
          Leaderboard: long swipe up
        </span>
      </MobileOnlyView>

      <BrowserView>
        <span className='instructions' hidden={gameStarted && !gameEnded}>
          Move left: ← or H <br />
          Move right: → or L<br />
          Select and drop: S <br />
          Restart: R <br />
          Leaderboard: Space
        </span>
      </BrowserView>

      <Time started={gameStarted} ended={gameEnded}></Time>



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

      <footer>
        online players: {onlinePlayerCount}<br /> <br />
        made by a <a href="https://github.com/v4rgas" target='_blank'>communist drug fueled atheist </a>
        with a little help from a <a href="https://github.com/BrunoFarfan" target='_blank'>profit-driven crypto-bro</a>
      </footer>
    </>


  )
}

export default App
