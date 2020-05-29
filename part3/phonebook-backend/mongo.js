const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://xuxe:${password}@cluster0-tnxei.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    id: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    console.log('Phonebook:');
    Person.find({})
        .then(people => {
            people.forEach(person => console.log(person));
            mongoose.connection.close();
            process.exit(0);
        });
} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: Math.random() * 100000
    });
    person.save().then(() => {
        console.log('added ' + person.name + ' number ' + person.number + ' to phonebook');
        mongoose.connection.close();
    });
}
