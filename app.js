const express = require('express')
const bodyParser = require('body-parser')
const { getEvents, postEvent } = require('./src/events')
const { getPeople, postPerson } = require('./src/users')
const { getSingleEvent } = require('./src/events/eventId')
const { getSinglePerson } = require('./src/users/userId')

const app = express()
app.use(bodyParser.json())
const port = 3001

//app.get('/events', (req, res) => getEvents(req, res))
app.get('/events', getEvents)
app.get('/events/:eventId', getSingleEvent)
app.post('/events', postEvent)

app.get('/people', getPeople)
app.get('/people/:userId', getSinglePerson)
app.post('/people', postPerson)


app.get('/', (req, res) => {
    res.status(200).send('Hello There...General Kenobi')
})


app.listen(port, () => console.log('listening on http://localhost:' + port))