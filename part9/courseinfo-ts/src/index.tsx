import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import {CoursePart} from "./types";


const App: React.FC = () => {
// this is the new coursePart variable
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "My test part",
            exerciseCount: 69,
            description: "This is an awesome test part"
        },
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        }
    ];

    return (
        <div>
            <Header courseName={courseName}/>
            <Content courseParts={courseParts}/>
            <Total courseParts={courseParts}/>
        </div>
    );
};


ReactDOM.render(<App/>, document.getElementById("root"));
