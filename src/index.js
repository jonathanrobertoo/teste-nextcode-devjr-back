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
  const { originalname: name, size, buffer } = req.file

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

  const image = await getImage(imageId)

  res.send(image)
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
