const express = require('express')
const app = express()
app.use(express.json())

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(person => person.id === id)

    if (person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const date = new Date()
    const numEntries = data.length;
    const content = `
        <p>Phonebook has info for ${numEntries} people </p>
        <p> ${date} </p>
    `
    res.send(content)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    data = data.filter(person => person.id !== id)
    
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (data.find(person => person.name === body.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.random() * (10000 - data.length) + data.length
    }

    data = data.concat(person)
    res.json(person)
})

const PORT=3001
app.listen(PORT)
console.log(`server started on port ${PORT}`)