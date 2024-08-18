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

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const generateInitialBlockArrayAndSelectedIndex = () => {
        const blockArray = shuffleArray(Array.from({ length: 20 }, (_, i) => [i + 1]));
        const selectedBlockIndex = 0;
        return joinAdjacentBlocks(blockArray, selectedBlockIndex);
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

    const joinAdjacentBlocks = (blockArray, selectedBlockIndex) => {
        let newBlockArray = mergeAdjacentBlocks(blockArray);
        const currentSelectedBlockValue = blockArray[selectedBlockIndex][0];
        console.log(blockArray, newBlockArray)

        const newSelectedBlockIndex = newBlockArray.findIndex((block) => block.includes(currentSelectedBlockValue));

        return {
            blockArray: newBlockArray,
            selectedBlockIndex: newSelectedBlockIndex
        };
    };


    const moveSelectedBlockRight = (blockArray, selectedBlockIndex) => {
        if (selectedBlockIndex < blockArray.length - 1) {
            const newBlockArray = [...blockArray];
            [newBlockArray[selectedBlockIndex], newBlockArray[selectedBlockIndex + 1]] =
                [newBlockArray[selectedBlockIndex + 1], newBlockArray[selectedBlockIndex]];

            return {
                blockArray: newBlockArray,
                selectedBlockIndex: selectedBlockIndex + 1
            };
        }
        return {
            blockArray,
            selectedBlockIndex
        };


    };

    const moveSelectedBlockLeft = (blockArray, selectedBlockIndex) => {
        if (selectedBlockIndex > 0) {
            const newBlockArray = [...blockArray];
            [newBlockArray[selectedBlockIndex], newBlockArray[selectedBlockIndex - 1]] =
                [newBlockArray[selectedBlockIndex - 1], newBlockArray[selectedBlockIndex]];

            return {
                blockArray: newBlockArray,
                selectedBlockIndex: selectedBlockIndex - 1
            };
        }
        return {
            blockArray,
            selectedBlockIndex
        };

    };




    const handleLeftArrow = (blockArray, selectedBlockIndex, isBlockSelected) => {
        playClickSound();
        if (isBlockSelected)
            return moveSelectedBlockLeft(blockArray, selectedBlockIndex);
        else
            return {
                blockArray,
                selectedBlockIndex: selectedBlockIndex > 0 ? selectedBlockIndex - 1 : selectedBlockIndex
            };
    }

    const handleRightArrow = (blockArray, selectedBlockIndex, isBlockSelected) => {
        playClickSound();
        if (isBlockSelected)
            return moveSelectedBlockRight(blockArray, selectedBlockIndex);
        else
            return {
                blockArray,
                selectedBlockIndex: selectedBlockIndex < blockArray.length - 1 ? selectedBlockIndex + 1 : selectedBlockIndex
            };
    }

    const handleSelectionButton = (blockArray, selectedBlockIndex, selected) => {
        playSelectionSound()
        if (selected)
            return { ...joinAdjacentBlocks(blockArray, selectedBlockIndex), selected: !selected };
        else
            return {
                blockArray,
                selectedBlockIndex,
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
