const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000
// Server is listening on a given port 
app.listen(port, () => {
    console.log(`Server is listening on port ${port} `)
})
// connecting to Mongo db DataBase
const uri = ''  // This will be the Mongo DB connection string.
mongoose.connect(uri, {
    useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true
})

let db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to Mongo DB')
})
// The user schema 
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 3 },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
})
// Constructing the user model from the schema.
const userModel = mongoose.model('User', userSchema)

// Settting up some Rest Api to communicate with our express app

// To get the users data from Database
app.get('/', (req, res) => {
    userModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))
})
// Posting user to Database
app.post('/add', (req, res) => {
    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
})







