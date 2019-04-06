const express = require('express')
const app = express()
const bodyParser = require('body-parser') 

app.use(express.static('build'))
app.use(bodyParser.json())

let persons = [
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find (person => person.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
const person = request.body
person.id = Math.floor(Math.random() * 100000)

if(person.name === undefined) {
  return response.status(400).json({error: 'name missing'})
}
if (person.number === undefined) {
  return response.status(400).json({error: 'number missing'})
}

if (persons.map(person => person.name).includes(person.name)) {
  return response.status(400).json({error: 'Nimi on jo'})
}

persons = persons.concat(person)

response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})