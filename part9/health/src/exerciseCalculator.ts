const calculateExercises = (dailyHours: Array<number>, target: number) => {
    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter(n => n !== 0).length
    const average = (dailyHours.reduce((a, b) => a + b, 0)) / periodLength
    const success = average > target
    let rating
    if (success)
        rating = {value: 3, reason: "Well done"}
    else if (target - average < 1)
        rating = {value: 2, reason: "Not bad, could be better"}
    else rating = {value: 1, reason: "Needs more work"}
    return {
        periodLength,
        trainingDays,
        success,
        rating: rating.value,
        ratingDescription: rating.reason,
        target,
        average
    }
}
const dailyHours: Array<number> = JSON.parse(process.argv[2])
const target: number = Number(process.argv[3])
console.log(calculateExercises(dailyHours, target))
