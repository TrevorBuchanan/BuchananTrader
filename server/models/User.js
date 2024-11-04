// User.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt'); 

const User = sequelize.define('User', {
    // Define your model attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Additional model options
    tableName: 'users',
    timestamps: true, // Enables createdAt and updatedAt fields
});

// Hash password before saving to the database
User.beforeSave(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;

    // password: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //         len: {
    //             args: [8, 42],
    //             msg: "Password must be between 8 and 42 characters in length."
    //         },
    //         is: {
    //             args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    //             msg: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    //         }
    //     }
    // }
