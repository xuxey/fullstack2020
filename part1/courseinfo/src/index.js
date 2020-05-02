import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
      <>
        <h1>{props.course}</h1>
      </>
  );
};

const Content = (props) => {
    let partList = [];
    for(let[k, v] of props.parts) {
        partList.push(<Part name = {k} value = {v}/>);
    }
    return (
        partList
    );
};
const Part = (props) => {
    return (
        <p>
            {props.name} {props.value}
        </p>
    )
};
const Total = (props) => {
    let total = 0;
    for(let [,v] of props.parts) {
        total = total+v;
    }
    return (
        <p>Number of exercises {total}</p>
    )
};
const App = () => {
  const course = 'Half Stack application development';
  const parts = [['Fundamentals of React', 10],
        ['Using props to pass data', 7],
        ['State of a component', 14]];
  return (
      <div>
          <Header course={course}/>
          <Content parts={parts}/>
          <Total parts = {parts}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
