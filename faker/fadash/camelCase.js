import upperFirst from './upperFirst.js'
import words from './words.js'
import toString from './toString.js'

const camelCase = (string) => {
  words(toString(string).replace(/['\u2019']/g, '')).reduce((result, word, index) => {
    word = word.toLowerCase()
    return result + (index ? upperFirst(word) : word)
  }, '')
}

export default camelCase
