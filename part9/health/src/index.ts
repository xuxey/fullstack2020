import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises, exerciseValues} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.weight || !req.query.height) {
        res.status(400).end();
        return;
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.json({height, weight, bmi}).send();
});


app.post('/exercises', (req, res) => {
    if (!('body' in req) || !('daily_exercises' in req.body) || !('target' in req.body))
        res.status(400).json({error: "parameters missing"}).end();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else if (typeof req.body.target !== 'number' || !Array.isArray(req.body.daily_exercises))
        res.status(400).json({error: "malformatted parameters"}).end();
    else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {daily_exercises, target} = req.body;
        console.log(daily_exercises, target);
        const result: exerciseValues = calculateExercises(daily_exercises, target);
        res.status(200).json(result).send();
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
