const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const propertyIsRequired = '{0} is required.'

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Username'),
        unique: true
    },
    password: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Password')
    },
    salt: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'First name')
    },
    lastName: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Last name')
    },
    age: {
        type: Number,
        min: [0, 'Age must be between 0 and 120'],
        max: [120, 'Age must be between 0 and 120']
    },
    roles: [{ type: String }],
    rentedCars: [{
        carId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Car'
        },
        duration: {
            type: Number,
            required: propertyIsRequired.replace('{0}', 'Duration')
        }
    }]
})

userSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password)

        if (hashedPassword === this.password) {
            return true
        }

        return false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User

module.exports.seedAdminUser = () => {
    User.find({ username: 'admin' }).then(users => {
        if (users.length === 0) {
            let salt = encryption.generateSalt()
            let hashedPass = encryption.generateHashedPassword(salt, 'Admin12')

            User.create({
                username: 'admin',
                firstName: 'ALex',
                lastName: 'Teneva',
                salt: salt,
                password: hashedPass,
                age: 24,
                roles: ['Admin']
            })
        }
    })
}
