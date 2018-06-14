'use strict'

const CHARACTERS_LIMIT = process.env.LIMIT || 80

exports.justify = text => {
    const paragraphs = text.split(/[\r\n]/).filter(paragraph => paragraph.match(/[\S]/))
    const justifiedParagraphs = []

    paragraphs.forEach(paragraph => {
        const words = paragraph.split(' ').filter(word => word !== ' ')

        const lines = []
        let line = ''
        words.forEach(word => {
            //if line + word exceed characters limit, then add the missing spaces randomly between words
            if (line.length + word.length >= CHARACTERS_LIMIT) { //Not forgetting the space between the end of the line and the word
                lines.push(completeLineWithRandomSpaces(line))
                line = word
            }
            else {
                if (line === '') line = word
                else line += ` ${word}`
            }
        })

        const lastLine = line === '' ? lines[lines.length - 1] : line
        lines[lines.length === 0 ? 0 : lines.length - 1] = completeLineWithRandomSpaces(lastLine)

        justifiedParagraphs.push(lines.join('\n'))
    })

    return justifiedParagraphs.join('\r\r')

}

const completeLineWithRandomSpaces = line => {
    const lineArray = line.split(' ')
    for (let i = 0; i < CHARACTERS_LIMIT - line.length; i++) {
        const randomIndex = Math.floor((Math.random() * (lineArray.length - 1)) + 1)
        lineArray.splice(randomIndex, 1, ` ${lineArray[randomIndex]}`)
    }
    return lineArray.join(' ')
}