const expect = require('expect')

const { justify } = require('../module')

const CHARACTERS_LIMIT = process.env.LIMIT || 80
const longTextOneParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const multipleParagraph = 'It fell to Little Walder to keep Lord Ramsay’s cup filled, whilst Big Walder poured for the others at the high table. Reek was chained up beside the doors lest his odor put the feasters off their appetites. He would eat later, off whatever scraps Lord Ramsay thought to send him. The dogs enjoyed the run of the hall, however, and provided the night’s best entertainment, when Maude and Grey Jeyne tore into one of Lord Stout’s hounds over an especially meaty bone that Will Short had tossed them. Reek was the only man in the hall who did not watch the three dogs fight. He kept his eyes on Ramsay Bolton.\n' +
    '\r' +
    '       \n' +
    '\n' +
    '\t\n' +
    '\n' +
    'The fight did not end until their host’s dog was dead. Stout’s old hound never stood a mummer’s chance. He had been one against two, and Ramsay’s bitches were young, strong, and savage. Ben Bones, who liked the dogs better than their master, had told Reek they were all named after peasant girls Ramsay had hunted, raped, and killed back when he’d still been a bastard, running with the first Reek. “The ones who give him good sport, anywise. The ones who weep and beg and won’t run don’t get to come back as bitches.” The next litter to come out of the Dreadfort’s kennels would include a Kyra, Reek did not doubt. “He’s trained ’em to kill wolves as well,” Ben Bones had confided. Reek said nothing. He knew which wolves the girls were meant to kill, but he had no wish to watch the girls fighting over his severed toe.'

describe('justify', () => {
    it('should return empty text when giving empty text', () => {
        expect(justify('')).toMatch('')
    })

    it('should return justified text when getting long text', () => {
        const justifiedText = justify(longTextOneParagraph)
        justifiedText.split(/[\r\n]/).forEach(line => {
            expect(line).toHaveLength(CHARACTERS_LIMIT)
        })
    })

    it('should return justified text for each paragraph when getting a multiple-paragraph text with empty and non-empty spaced lines as separators', () => {
        const justifiedText = justify(multipleParagraph)
        justifiedText.split(/[\r\n]/).filter(line => line.match(/[\S]/)).forEach(line => {
            expect(line).toHaveLength(CHARACTERS_LIMIT)
        })
    })
})