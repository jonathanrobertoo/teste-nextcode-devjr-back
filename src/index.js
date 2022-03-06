'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')

const { startDatabase } = require('./database/mongo')
const { insertImage, getImages, getImage, deleteImage } = require('./database/images')

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const upload = multer()

app.post('/images', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(500).send('No file was sent.')
  }

  const { originalname: name, size, buffer } = req.file

  const extension = name.split('.').pop().toLowerCase()

  if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
    return res.status(500).send('Invalid file extension.')
  }

  const file = {
    name,
    size,
    base64: buffer.toString('base64')
  }

  await insertImage(file)

  res.status(201).send({ message: 'New photo inserted.', file })
})

app.get('/images', async (req, res) => {
  res.send(await getImages())
})

app.get('/images/:image', async (req, res) => {
  const { image: imageId } = req.params

  const file = await getImage(imageId)

  if (!file) {
    return res.status(404).send('File not found.')
  }

  res.send(file)
})

app.delete('/images/:image', async (req, res) => {
  const { image: imageId } = req.params

  await deleteImage(imageId)

  res.status(204).send({ message: 'Image removed.' })
})

startDatabase().then(() => {
  app.listen(3001, () => {
    console.log('listening on port 3001')
  })
})
