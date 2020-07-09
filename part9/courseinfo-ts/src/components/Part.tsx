import React from "react";
import {CoursePart} from "../types";

const Part: React.FC<{ part: CoursePart }> = ({part}) => {
    switch (part.name) {
        case "My test part":
            return <div>{part.name} - {part.exerciseCount} - {part.description}</div>
        case "Deeper type usage":
            return (
                <div>
                    <a href={part.exerciseSubmissionLink}>{part.name}</a> - {part.exerciseCount} - {part.description}
                </div>
            )
        case "Fundamentals":
            return (
                <div>
                    {part.name} - {part.exerciseCount} - {part.description}
                </div>
            )
        case "Using props to pass data":
            return (
                <div>
                    {part.name} - {part.exerciseCount} - {part.groupProjectCount}
                </div>
            )
        default:
            return assertNever(part)
    }
}
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
export default Part
