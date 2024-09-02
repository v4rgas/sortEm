import './App.css'

import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { Fragment, useEffect } from 'react';

import NumberBlock from './BaseGame/NumberBlock'
import Time from './Time';
import { themeAtom } from './atoms';
import useApi from './useApi';
import { useAtomValue } from 'jotai';
import useGameLogic from './BaseGame/useGameLogic';
import { useKeyboard } from './BaseGame/useKeyboard';
import { useNavigate } from 'react-router-dom';
import useState from 'react-usestateref';
import { useSwipeable } from 'react-swipeable';

function App() {
  const { getNumberOfOnlinePlayers, getTotalGamesPlayed } = useApi()
  const { generateInitialBlockArrayAndSelectedIndex,
    handleLeftArrow,
    handleRightArrow,
    handleSelectionButton,
    isGameFinished,
    handleGameFinished,
    muteGameAudio
  } = useGameLogic();

  const [blockArray, setBlockArray, blockArrayRef] = useState([]);
  const [focusedBlockIndex, setfocusedBlockIndex, focusedBlockIndexRef] = useState(0);
  const [selected, setSelected, selectedRef] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [onlinePlayerCount, setOnlinePlayerCount] = useState(1);
  const themeStorage = useAtomValue(themeAtom)
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(2234);



  const navigate = useNavigate();

  const goToLeaderboard = () => {
    navigate('/l');
  }

  const onNewGame = () => {
    setGameEnded(false);
    setGameStarted(false);
    setfocusedBlockIndex(0);
    setSelected(false);
    updateGameState(generateInitialBlockArrayAndSelectedIndex());
  }

  const updateGameState = ({ blockArray, focusedBlockIndex }) => {
    setBlockArray(blockArray);
    setfocusedBlockIndex(focusedBlockIndex);
    if (isGameFinished(blockArray)) {
      setGameEnded(true);
      handleGameFinished();
    }
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

  const onSwipedLeft = () => {
    if (!gameStarted)
      goToLeaderboard();
    else
      onLeftArrow();
  }

  const onSwipedRight = () => {
    if (!gameStarted)
      goToLeaderboard();
    else
      onRightArrow();
  }



  useKeyboard({
    key: ["ArrowRight", 'L', 'l', 'D', 'd'],
    preventRepeat: true,
    onKeyPressed: onRightArrow
  });

  useKeyboard({
    key: ["ArrowLeft", 'H', 'h', 'A', 'a'],
    preventRepeat: true,
    onKeyPressed: onLeftArrow
  });

  useKeyboard({
    key: ["s", "S", "j", "J"],
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

  useKeyboard({
    key: ["m", "M"],
    preventRepeat: true,
    onKeyPressed: muteGameAudio
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    onTap: onSelectionButton,
  });

  const longSwipeHandlers = useSwipeable({
    onSwipedDown: onNewGame,
    delta: 300
  });

  const mainElement = document.querySelector('main');
  useEffect(() => {
    swipeHandlers.ref(mainElement);
    longSwipeHandlers.ref(mainElement);
    return () => {
      swipeHandlers.ref({});
      longSwipeHandlers.ref({});
    }
  })

  useEffect(() => {
    const { blockArray, focusedBlockIndex } = generateInitialBlockArrayAndSelectedIndex();
    getNumberOfOnlinePlayers().then((data) => {
      setOnlinePlayerCount(data.activeUsers);
    })

    getTotalGamesPlayed().then((data) => {
      setTotalGamesPlayed(data.total);
    })



    updateGameState({ blockArray, focusedBlockIndex });
  }, [])




  return (
    <Fragment>
      <main>
        <MobileOnlyView>
          <span className='instructions' hidden={gameStarted}>
            Tap to start<br /><br />

            Move left: swipe left <br />
            Move right: swipe right <br />
            Select and drop: tap <br />
            Restart: long swipe down <br /><br />

            Leaderboard: swipe left or right<br />

          </span>
        </MobileOnlyView>

        <BrowserView>
          <span className='instructions' hidden={gameStarted && !gameEnded}>
            Move left: ← or H or A <br />
            Move right: → or L or D<br />
            Select and drop: S or J <br />
            Restart: R <br />
            Mute: M <br />
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

      </main>

      <MobileOnlyView>
        <div className='mobile-action-buttons'>
          <button onClick={onLeftArrow} >←</button>
          <button onClick={onSelectionButton}>select</button>
          <button onClick={onRightArrow}>→</button>
        </div>
      </MobileOnlyView>

      <footer key={gameStarted} hidden={gameStarted && !gameEnded}>
        online players: {onlinePlayerCount}<br />
        total games played: {totalGamesPlayed} {"♥"} <br />
      </footer>
    </Fragment>


  )
}

export default App
