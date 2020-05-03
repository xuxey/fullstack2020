import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90% of the code accounts for the first 90% of the development time...The remaining 10% of the code accounts for the other 90% of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const Votes = (props) => {
    let highest = props.highest;
    if (props.votes[highest] === 0) {
        return (
            <div>
                <h2> No vote data found </h2>
            </div>
        )
    }
    return (
        <div>
            <h3>Anecdote with most votes</h3>
            <h4>{anecdotes[highest]}</h4>
        </div>
    )
};

const App = () => {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
    const [highest, setHighest] = useState(0);

    const voteForId = (id) => {
        for (let i = 0; i < points.length; i++) {
            if (points[highest] < points[i]) {
                setHighest(i);
            }
        }
        return () => {
            const copyPoints = [...points];
            copyPoints[id] += 1;
            setPoints(copyPoints);
        }
    };

    const handleClick = (id) => {
        return () => {
            const randomNum = setSelected(Math.floor(Math.random() * anecdotes.length));
            if (randomNum === id)
                return setSelected(Math.floor(Math.random() * id));
        }
    };

    return (
        <div align='center'>
            {anecdotes[selected]}
            <br/>
            Votes: {points[selected]}
            <br/>
            <Button text='Next' handleClick={handleClick} current={selected}/>
            <Button text='Vote' handleClick={voteForId} current={selected}/>
            <Votes highest={highest} votes={points}/>
        </div>
    )
};

const Button = (props) => {
    return (
        <button onClick={props.handleClick(props.current)}>{props.text}</button>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
