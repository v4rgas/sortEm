// import click1Sound from './assets/click1.mp3';
import clickSound from './assets/keyboard/Audio 1.mp3';
import clickSound2 from './assets/keyboard/Audio 2.mp3';
import clickSound3 from './assets/keyboard/Audio 3.mp3';
import clickSound4 from './assets/keyboard/Audio 4.mp3';
import clickSound5 from './assets/keyboard/Audio 5.mp3';
import selectionSound from './assets/penclicks/Audio 1.mp3';
import selectionSound2 from './assets/penclicks/Audio 2.mp3';
import selectionSound3 from './assets/penclicks/Audio 3.mp3';
import selectionSound4 from './assets/penclicks/Audio 4.mp3';
import winSound from './assets/win.mp3';

export default function useGameLogic() {
    function shuffleArray(array) {
        let a = [...array];
        let n = a.length;
        for (let i = n - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            if (a[j] + 1 === a[i + 1]) { // a swap is going to violate the rule at i/i+1
                // Triple rotation at j, i, i+1 (or, when j == i, swap at i, i+1)
                a[j] = a[i];
                a[i] = a[i + 1]--;
            } else { // standard swap
                let temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
        // Finally check first two values:
        if (a[0] + 1 === a[1]) {
            let temp = a[0];
            a[0] = a[1];
            a[1] = temp;
        }
        return a;
    }


    const generateInitialBlockArrayAndSelectedIndex = () => {
        const blockArray = shuffleArray(Array.from({ length: 20 }, (_, i) => [i + 1]));
        const focusedBlockIndex = 0;
        return joinAdjacentBlocks(blockArray, focusedBlockIndex);
    };

    function playMp3(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
    }

    function playClickSound() {
        const audioSrc = [clickSound, clickSound2, clickSound3, clickSound4, clickSound5][Math.floor(Math.random() * 5)];
        playMp3(audioSrc);
    }

    function playSelectionSound() {
        const audioSrc = [selectionSound, selectionSound2, selectionSound3, selectionSound4][Math.floor(Math.random() * 4)];
        playMp3(audioSrc);
    }

    function mergeAdjacentBlocks(arr) {
        if (arr.length === 0) return [];

        let result = [];
        let currentBlock = arr[0];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i].length > 0 && (currentBlock.length === 0 || arr[i][0] === currentBlock[currentBlock.length - 1] + 1)) {
                currentBlock = currentBlock.concat(arr[i]);
            } else {
                result.push(currentBlock);
                currentBlock = arr[i];
            }
        }

        result.push(currentBlock);

        return result;
    }

    const joinAdjacentBlocks = (blockArray, focusedBlockIndex) => {
        let newBlockArray = mergeAdjacentBlocks(blockArray);
        const currentSelectedBlockValue = blockArray[focusedBlockIndex][0];
        console.log(blockArray, newBlockArray)

        const newfocusedBlockIndex = newBlockArray.findIndex((block) => block.includes(currentSelectedBlockValue));

        return {
            blockArray: newBlockArray,
            focusedBlockIndex: newfocusedBlockIndex
        };
    };


    const moveSelectedBlockRight = (blockArray, focusedBlockIndex) => {
        if (focusedBlockIndex < blockArray.length - 1) {
            const newBlockArray = [...blockArray];
            [newBlockArray[focusedBlockIndex], newBlockArray[focusedBlockIndex + 1]] =
                [newBlockArray[focusedBlockIndex + 1], newBlockArray[focusedBlockIndex]];

            return {
                blockArray: newBlockArray,
                focusedBlockIndex: focusedBlockIndex + 1
            };
        }
        return {
            blockArray,
            focusedBlockIndex
        };


    };

    const moveSelectedBlockLeft = (blockArray, focusedBlockIndex) => {
        if (focusedBlockIndex > 0) {
            const newBlockArray = [...blockArray];
            [newBlockArray[focusedBlockIndex], newBlockArray[focusedBlockIndex - 1]] =
                [newBlockArray[focusedBlockIndex - 1], newBlockArray[focusedBlockIndex]];

            return {
                blockArray: newBlockArray,
                focusedBlockIndex: focusedBlockIndex - 1
            };
        }
        return {
            blockArray,
            focusedBlockIndex
        };

    };




    const handleLeftArrow = (blockArray, focusedBlockIndex, isBlockSelected) => {
        playClickSound();
        if (isBlockSelected)
            return moveSelectedBlockLeft(blockArray, focusedBlockIndex);
        else
            return {
                blockArray,
                focusedBlockIndex: focusedBlockIndex > 0 ? focusedBlockIndex - 1 : focusedBlockIndex
            };
    }

    const handleRightArrow = (blockArray, focusedBlockIndex, isBlockSelected) => {
        playClickSound();
        if (isBlockSelected)
            return moveSelectedBlockRight(blockArray, focusedBlockIndex);
        else
            return {
                blockArray,
                focusedBlockIndex: focusedBlockIndex < blockArray.length - 1 ? focusedBlockIndex + 1 : focusedBlockIndex
            };
    }

    const handleSelectionButton = (blockArray, focusedBlockIndex, selected) => {
        playSelectionSound()
        if (selected)
            return { ...joinAdjacentBlocks(blockArray, focusedBlockIndex), selected: !selected };
        else
            return {
                blockArray,
                focusedBlockIndex,
                selected: !selected
            };

    }

    const isGameFinished = (blockArray) => {
        return blockArray.length === 1;
    }

    const handleGameFinished = () => {
        console.log('Game finished');
        playMp3(winSound);
    }



    return {
        generateInitialBlockArrayAndSelectedIndex,
        moveSelectedBlockRight,
        moveSelectedBlockLeft,
        joinAdjacentBlocks,
        handleLeftArrow,
        handleRightArrow,
        handleSelectionButton,
        isGameFinished,
        handleGameFinished
    };
}
