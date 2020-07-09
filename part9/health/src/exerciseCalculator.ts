export type exerciseValues = {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

export const calculateExercises = (dailyHours: Array<number>, target: number): exerciseValues => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(n => n !== 0).length;
    const average = (dailyHours.reduce((a, b) => a + b, 0)) / periodLength;
    const success = average > target;
    let rating;
    if (success)
        rating = {value: 3, reason: "Well done"};
    else if (target - average < 1)
        rating = {value: 2, reason: "Not bad, could be better"};
    else rating = {value: 1, reason: "Needs more work"};
    return {
        periodLength,
        trainingDays,
        success,
        rating: rating.value,
        ratingDescription: rating.reason,
        target,
        average
    };
};
/*
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const dailyHours: Array<number> = JSON.parse(process.argv[2]);
const target = Number(process.argv[3]);
console.log(calculateExercises(dailyHours, target));*/
