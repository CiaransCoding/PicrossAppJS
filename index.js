//Sample data
const solution = [0, 1, 2, 5, 6, 7, 9, 13, 14, 18, 19, 22, 23]

const correctPicks = []

const boardSize = {
    x: 5,
    y: 5
}

const createGame = () => {
    for (let i = 0; i < boardSize.x; i++) {
        const clueTile = document.createElement('div')
        clueTile.classList.add('tile')
        document.querySelector('.clues').appendChild(clueTile)
    }

    for (let i = 0; i < boardSize.x * boardSize.y; i++) {
        
        const tileElement = document.createElement('img');
        tileElement.classList.add('tile')
        tileElement.classList.add('unselected')
        tileElement.setAttribute('data-id', i)
        tileElement.setAttribute('data-selected', false)

        tileElement.addEventListener('click', () => {

            if (tileElement.classList.contains('unselected')) {
                tileElement.classList.remove('unselected')

                if (checkSelection(tileElement.getAttribute('data-id'))) {
                    tileElement.classList.add('correct')
                    correctPicks.push(parseInt(tileElement.getAttribute('data-id')))
                } else {
                    tileElement.classList.add('incorrect')
                }
            } else {
                tileElement.classList.add('unselected')
                tileElement.classList.remove('correct')
                tileElement.classList.remove('incorrect')
            }

            if (checkIfComplete()) {
                alert("You win! It's an unintelligable shape!")
            }
        })

        document.querySelector('.game').appendChild(tileElement)
    }

    getClues()
}   

const checkSelection = (valueToCheck) => {
    return solution.includes(parseInt(valueToCheck))
}

const checkIfComplete = () => {
    if (correctPicks.length != solution.length) {
        return false
    }

    //sort into numerical order
    solution.sort( (a, b) => {return a-b})
    correctPicks.sort( (a, b) => {return a-b})
    
    //if all indexes match, then it's complete
    for (let i = 0; i < solution.length; i++) {
        if (solution[i] != correctPicks[i]) {
            return false
        }
    }
    return true
}

const getClues = () => {
    for (let i = 0; i < boardSize.x; i++) {
        let clues = getCluesForColumn(i)
        //TODO: do something with this so it can be displayed

        console.log(`column ${i}`)
        console.log(clues)
    }

    for (let q = 0; q < boardSize.x * boardSize.y; q++) {
        if (q % boardSize.x == 0) {
            const clues = getCluesForRow(q)
            //TODO: do something with this so it can be displayed        

            console.log(`row ${q}`)
            console.log(clues)
        }
    }
}

const getCluesForColumn =  (yIndex) => {
    const clues = []
    
    for (let i = yIndex; i < boardSize.x * boardSize.y; i += boardSize.x ) {
        if (solution.includes(i)) {
            clues.push(i)
        }
    }
    const sequencedClues = getSequencedClues(clues, boardSize.x)

    return sequencedClues
}

const getCluesForRow = (xIndex) => {
    const clues = []

    const rowLength = xIndex + boardSize.x
    
    for (let i = xIndex; i < rowLength; i++ ) {
        if (solution.includes(i)) {
            clues.push(i)
        }
    }
    const sequencedClues = getSequencedClues(clues)

    return sequencedClues
}

const getSequencedClues = (clues, axisLength = 1) => {
    let previousNumber
    let clueTotal = 0
    let sequencedClues = []

    for (let i = 0; i < clues.length; i++) {
        if (i == 0) {
            clueTotal += 1
        } else {
            if (previousNumber + axisLength == clues[i]) {
                clueTotal += 1
            } else {
                sequencedClues.push(clueTotal)
                clueTotal = 1
            }
        }
        previousNumber = clues[i]
    }
    sequencedClues.push(clueTotal)

    return sequencedClues
}

createGame()