import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.onClick(props.text)}>{props.text}</button>
    );
};

const Buttons = (props) => {
    return (
        <span>
            <Button onClick={props.onClick} text = 'Good'/>
            <Button onClick={props.onClick} text = 'Neutral'/>
            <Button onClick={props.onClick} text = 'Bad'/>
        </span>
    );
};

const Statistic = (props) => {
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.statHandler(props.text)}
            </td>
        </tr>
    )
};

const Statistics = (props) => {
    const  total = props.bad + props.neutral + props.good;
    if(total===0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    const statsHandler = (name) => {
        switch (name) {
            case 'Good':
                return props.good;
            case 'Neutral':
                return props.neutral;
            case 'Bad':
                return props.bad;
            case 'Total':
                return total;
            case 'Average':
                return ((props.good-props.bad)/total);
            case 'Positive':
                return (props.good*100)/total;
            default:
                return;
        }
    };
    return (
        <>
            <table>
                <Statistic text='Good' statHandler={statsHandler}/>
                <Statistic text='Good' statHandler={statsHandler}/>
                <Statistic text='Neutral' statHandler={statsHandler}/>
                <Statistic text='Bad' statHandler={statsHandler}/>
                <Statistic text='Total' statHandler={statsHandler}/>
                <Statistic text='Average' statHandler={statsHandler}/>
                <Statistic text='Positive' statHandler={statsHandler}/>
            </table>

        </>
    )
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClick = (name) => {
        switch (name) {
            case 'Good':
                return () => setGood(good+1);
            case 'Neutral':
                return () => setNeutral(neutral+1);
            case 'Bad':
                return () => setBad(bad+1);
            default:
                return;
        }
    };

    return (
        <div>
            <h1>Unicafe Feedback</h1>
            <Buttons onClick={handleClick} />
            <h2>Statistics</h2>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    );
};

ReactDOM.render(<App />,document.getElementById('root'));

