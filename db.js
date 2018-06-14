const mongoose = require('mongoose')

const dbURI = process.env.DB_URI
mongoose.connect(dbURI)

const userSchema = new mongoose.Schema({
    email: String,
    remaining: Number,
    lastTokenCreationDate: Date,
})

exports.User = mongoose.model('User', userSchema)
