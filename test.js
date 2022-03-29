//expected output = [3, 1, 2]
const sequence = [1, 2, 3, 5, 9, 10]

const getSequencedClues = (clues) => {
    const sequencedClues = []
    
    let clueTotal = 1
    let previousNumber

    for (let i = 0; i <= clues.length; i++) {
        
        if (clues[i] == previousNumber + 1) {
            clueTotal += 1
            previousNumber = clues[i]
        } else {
            sequencedClues.push(clueTotal)
            clueTotal = 1
            previousNumber = clues[i]
        }

        if (i = clues.length) {
            sequencedClues.push(clueTotal)
        }

    }

    return sequencedClues
}

console.log(getSequencedClues(sequence))