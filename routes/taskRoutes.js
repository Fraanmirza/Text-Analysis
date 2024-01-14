const express = require('express')
const router = express.Router()
const {
  fileUpload,
  Analysis,
  analysisResult,
} = require('../controllers/taskControllers')
const multer = require('multer')

//multer set up
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// route to upload a Text file
router.route('/uploadFile').post(upload.single('file'), fileUpload)

//Initiate Analysis route
router.route('/analize/:fileId').post(Analysis)

// get analysis result
router.route('/analysis-result/:taskId').get(analysisResult)

module.exports = router
