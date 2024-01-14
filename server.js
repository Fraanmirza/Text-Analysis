const express = require('express')
const app = express()
const taskRoutes = require('./routes/taskRoutes')
const connect = require('./db/connect')

const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world ')
})

// routes
app.use('/api/v1', taskRoutes)

//Starter function
const start = async () => {
  try {
    await connect()
    app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

//start
start()
