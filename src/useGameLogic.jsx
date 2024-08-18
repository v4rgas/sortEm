import clickSound from './assets/click.mp3';
import selectionSound from './assets/selection.mp3';

export default function useGameLogic() {
    const shuffleArray = (array) => {
        const shuffledArray = [];
        let lastSelectedItem = null;

        while (array.length > 0) {
            const validIndices = array.map((item, index) => {
                if (lastSelectedItem === null || Math.abs(item - lastSelectedItem) > 1) {
                    return index;
                }
                return null;
            }).filter(index => index !== null);

            if (validIndices.length === 0) {
                shuffledArray.push(array.pop());
                break;
            }

            const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
            const selectedItem = array[randomIndex];

            shuffledArray.push(selectedItem);
            lastSelectedItem = selectedItem;
            array.splice(randomIndex, 1);
        }

        return shuffledArray;
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
        playMp3(clickSound);
        if (isBlockSelected)
            return moveSelectedBlockLeft(blockArray, selectedBlockIndex);
        else
            return {
                blockArray,
                selectedBlockIndex: selectedBlockIndex > 0 ? selectedBlockIndex - 1 : selectedBlockIndex
            };
    }

    const handleRightArrow = (blockArray, selectedBlockIndex, isBlockSelected) => {
        playMp3(clickSound);
        if (isBlockSelected)
            return moveSelectedBlockRight(blockArray, selectedBlockIndex);
        else
            return {
                blockArray,
                selectedBlockIndex: selectedBlockIndex < blockArray.length - 1 ? selectedBlockIndex + 1 : selectedBlockIndex
            };
    }

    const handleSelectionButton = (blockArray, selectedBlockIndex, selected) => {
        playMp3(selectionSound);
        if (selected)
            return { ...joinAdjacentBlocks(blockArray, selectedBlockIndex), selected: !selected };
        else
            return {
                blockArray,
                selectedBlockIndex,
                selected: !selected
            };

    }



    return {
        generateInitialBlockArrayAndSelectedIndex,
        moveSelectedBlockRight,
        moveSelectedBlockLeft,
        joinAdjacentBlocks,
        handleLeftArrow,
        handleRightArrow,
        handleSelectionButton
    };
}
