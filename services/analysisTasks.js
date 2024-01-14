// Function to initiate the analysis task asynchronously
const initiateAnalysisTask = async (
  taskId,
  text,
  operation,
  options,
  analysisTasks
) => {
  switch (operation) {
    case 'countWords':
      const wordCount = await countWords(text)
      analysisTasks[taskId].result = `total word count is : ${wordCount} `
      analysisTasks[taskId].status = 'completed'
      break
    case 'countUniqueWords':
      const count = await countUniqueWords(text)
      analysisTasks[taskId].result = `total unique word are : ${count} `
      analysisTasks[taskId].status = 'completed'
      break
    case 'findTopKWords':
      const result = findTopKWords(text, options.k)

      analysisTasks[taskId].result = `[${result
        .map(
          ({ word, frequency }) =>
            `{ word: '${word}', frequency: ${frequency} }`
        )
        .join(', ')}]`

      analysisTasks[taskId].status = 'completed'
      break
    default:
      break
  }
}

// function to count
const countWords = (text) => {
  const words = text.split(/\s+/)
  return words.length
}

// function to count unique words

const countUniqueWords = (text) => {
  // Split the text into words
  const words = text.split(/\s+/)

  // Create a Set to store unique words
  const uniqueWordsSet = new Set(words)

  // Convert the Set to an array for returning the list of unique words
  const uniqueWordsArray = Array.from(uniqueWordsSet)

  return uniqueWordsArray.length
}

//count the TopKWords

const findTopKWords = (text, k) => {
  // Split the text into words
  const words = text.split(/\s+/)

  // Create an object to store the frequency of each word
  const wordFrequency = {}
  words.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1
  })

  // Sort the words based on frequency in descending order
  const sortedWords = Object.keys(wordFrequency).sort(
    (a, b) => wordFrequency[b] - wordFrequency[a]
  )

  // Get the top k words and their frequencies
  const topKWords = sortedWords.slice(0, k).map((word) => ({
    word: word,
    frequency: wordFrequency[word],
  }))

  return topKWords
}

module.exports = initiateAnalysisTask
