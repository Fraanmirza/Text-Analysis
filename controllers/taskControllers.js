const { v4: uuidv4 } = require('uuid')
const File = require('../models/file')
const initiateAnalysisTask = require('../services/analysisTasks')

// Generate unique id
function generateUniqueId() {
  return uuidv4()
}

const fileUpload = async (req, res) => {
  const file = req.file
  // Extract the original file name from the request
  const originalFileName = req.file.originalname

  if (!file) {
    return res.status(400).send('No file uploaded.')
  }
  try {
    const newFile = new File({
      fileId: generateUniqueId(),
      fileName: originalFileName,
      content: file.buffer,
    })
    await newFile.save()
    res.status(201).json({
      fileId: newFile.fileId,
      msg: 'File is successfully uploaded',
    })
  } catch (error) {
    console.error('Error saving file to MongoDB:', error)
    res.status(500).send('Internal Server Error')
  }
}

// A placeholder for storing analysis tasks and results
const analysisTasks = {}

const Analysis = async (req, res) => {
  try {
    const fileId = req.params.fileId
    const { operation, options } = req.body

    // Find the file in MongoDB based on fileId
    const file = await File.findOne({ fileId })

    if (!file) {
      return res.status(404).send('File not found.')
    }
    // Generate a unique taskId
    const taskId = generateUniqueId()

    // Store the task details
    analysisTasks[taskId] = {
      fileId,
      operation,
      options,
      status: 'pending',
    }
    // Initiate the analysis task asynchronously
    initiateAnalysisTask(
      taskId,
      file.content.toString(),
      operation,
      options,
      analysisTasks
    )
    res.json({ taskId, status: 'pending' })
  } catch (error) {
    console.error('Error initiating analysis task:', error)
    res.status(500).send('Internal Server Error')
  }
}

const analysisResult = async (req, res) => {
  try {
    const taskId = req.params.taskId
    // Check if the taskId exists in the analysisTasks
    if (!analysisTasks[taskId]) {
      return res.status(404).json({ error: 'Task not found.' })
    }

    // Check if the analysis task has been completed
    if (analysisTasks[taskId].status !== 'completed') {
      return res.json({ taskId, status: analysisTasks[taskId].status })
    }

    // If the analysis task is completed, return the results
    const result = analysisTasks[taskId].result
    res.json({ taskId, status: 'completed', result })
  } catch (error) {
    console.error('Error retrieving analysis results:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { fileUpload, Analysis, analysisResult }
