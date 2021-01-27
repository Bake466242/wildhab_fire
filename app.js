const express = require('express')
const bodyParser = require('body-parser')
const { getEvents, postEvent } = require('./src/events')
const { getPeople, postPerson } = require('./src/users')
const { getSingleEvent, deleteEvent, updateEvent } = require('./src/events/eventId')
const { getSinglePerson, deletePerson, updatePerson } = require('./src/users/userId')
const { getCategories, postCategory } = require('./src/categories')

const app = express()
app.use(bodyParser.json())
const port = 3001

//app.get('/events', (req, res) => getEvents(req, res))
app.get('/events', getEvents)
app.get('/events/:eventId', getSingleEvent)
app.post('/events', postEvent)
app.delete('/events/:eventId', deleteEvent)
app.patch('/events/:eventId', updateEvent)

app.get('/people', getPeople)
app.get('/people/:userId', getSinglePerson)
app.post('/people', postPerson)
app.delete('/people/:userId', deletePerson)
app.patch('/people/:userId', updatePerson)

app.get('/categories', getCategories)
app.post('/categories', postCategory)

app.get('/', (req, res) => {
    res.status(200).send('Hello There...General Kenobi')
})


app.listen(port, () => console.log('listening on http://localhost:' + port))