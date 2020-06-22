const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'username is too short'],
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: [3, 'name is too short']
    },
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema);