const express = require('express');
const app = express();
app.use(express.json());

var people = [
    {
        name: "Elon Musk",
        number: "432423434231",
        id: 1
    },
    {
        name: "Milady",
        number: "213231",
        id: 2
    },
    {
        name: "Lorem Ipsum",
        number: "324324324",
        id: 3
    }
];

app.get('/', (req, res) => {
    res.send('Phonebook backend is alive');
});

app.get('/api/persons', (req, res) => {
    res.json(people);
});
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = people.find(p => p.id === Number(id));
    if (person)
        res.json(person);
    else
        res.status(404).end();
});
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    people = people.filter(p => p.id !== Number(id));
    res.status(204).end();
});

app.post('/api/persons', (request, response) => {
    console.log(request.body);
    console.log(request);
    const body = request.body;
    console.log(body);
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (people.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }

    function generateId() {
        return Math.random() * 100000;
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    people = people.concat(person);

    response.json(person);
});

app.get('/info', (req, res) => {
    const today = new Date();
    res.send('Phonebook has records of ' + people.length + ' people ' +
        '<br/> Request time: '
        + today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds());
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
