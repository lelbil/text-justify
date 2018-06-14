const expect = require('expect')

const { completeLineWithRandomSpaces } = require('../module')

const CHARACTERS_LIMIT = process.env.LIMIT || 80

describe('completeLineWithRandomSpaces', () => {
    it('should return one word for one word', () => {
        expect(completeLineWithRandomSpaces('word')).toEqual('word')
    })

    it('should return 2 words separated by a big space if given two words', () => {
        const completedLine = completeLineWithRandomSpaces('two words')
        expect(completedLine).toEqual('two                                                                        words')
        expect(completedLine).toHaveLength(CHARACTERS_LIMIT)
    })

    it('should return a long line with spaces between words for a long sentence', () => {
        expect(completeLineWithRandomSpaces('should return a long line with spaces between words for a long sentence')).toHaveLength(CHARACTERS_LIMIT)
    })

    it('should return the same line when provided with a sentence having a length that exceeds the characters limit', () => {
        expect(completeLineWithRandomSpaces('should return the same line when provided with a sentence having a length that exceeds the characters limit, meaning no editing is being done on longer sentences').length)
            .toBeGreaterThan(CHARACTERS_LIMIT)
    })
})