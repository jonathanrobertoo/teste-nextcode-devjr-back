'use strict'
const { ObjectId } = require('mongodb')

const { getDatabase } = require('./mongo')

const collectionName = 'images'

async function insertImage (image) {
  const database = await getDatabase()

  const { insertedId } = await database.collection(collectionName).insertOne(image)

  return insertedId
}

async function getImages () {
  const database = await getDatabase()

  return await database.collection(collectionName)
    .find({}).toArray()
}

async function getImage (id) {
  const database = await getDatabase()

  return await database.collection(collectionName)
    .findOne({ _id: ObjectId(id) })
}

async function deleteImage (id) {
  const database = await getDatabase()

  await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id)
  })
}

module.exports = {
  insertImage,
  getImages,
  getImage,
  deleteImage
}
