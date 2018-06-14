const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const count = require('word-count')
const { justify } = require('./module')

const { User } = require('./db')
const { validateBody, doesUserExist, limitRate, verifyJWT } = require('./middleware')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())

const PORT = process.env.PORT || 3006

app.post('/api/register', validateBody, async (req, res) => {
    const user = req.body

    const newUser = new User(Object.assign({lastTokenCreationDate: new Date(), remaining: 80000}, user))
    const createdUser = await newUser.save()

    //should I create a token right now for the new user?

    res.status(201).json(createdUser)
})

app.post('/api/token', validateBody, doesUserExist, async (req, res) => {
    const { _id: id, email } = req.userObject
//TODO: change
    const token = jwt.sign({id, email}, process.env.SECRET || 'changeThis', { expiresIn: 24 * 3600 })

    res.status(200).json({ token })
})

app.post('/api/justify', verifyJWT, limitRate, (req, res) => {
    const text = req.body
    const howManyWords = count(text)

    if (req.userObject.remaining - howManyWords < 0) {
        return res.status(402).json("This texts length (in words) exceeds remaining rate (you are under a free version)")
    }

    res.status(200).end(justify(text))
})

//IMPORTANT: This route should be the last at all times
app.all('*', (req, res) => {
    res.status(404).end('NOT FOUND')
})

app.listen(PORT, () => {
    console.log(`Server started and listening on port ${PORT}`)
})