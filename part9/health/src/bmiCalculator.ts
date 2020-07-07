const calculateBmi = (height: number, weight: number): string => {
    height = height / 100
    const bmi = weight / (height * height)
    if (bmi < 15)
        return "Very Severely Underweight"
    else if (bmi < 16)
        return "Severely Underweight"
    else if (bmi < 18.5)
        return "Underweight"
    else if (bmi < 25)
        return "Normal (healthy weight)"
    else if (bmi < 30)
        return "Overweight"
    else if (bmi < 35)
        return "Obese Class I (Moderately obese)"
    else if (bmi < 40)
        return "Obese Class II (Severely obese)"
    else
        return "Obese Class III (Very severely obese)"
}

interface BMIValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    let {height, weight} = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (e) {
    console.log('Error, something bad happened', e.message);
}
