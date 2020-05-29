require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :reqData'));
morgan.token('reqData', (req, res) => {
    return JSON.stringify(req.body);
});
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Phonebook backend is alive');
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(
        people => res.json(people)
    )
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(p => {
            if (p) {
                res.json(p)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
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
    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(p => {
        response.json(p);
    });
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    const person = {
        name: body.name,
        number: body.number
    };
    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
});

app.get('/info', (req, res) => {
    Person.find().then(people => {
        const today = new Date();
        res.send('Phonebook has records of ' + people.length + ' people ' +
            '<br/> Request time: '
            + today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds());
    });
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
