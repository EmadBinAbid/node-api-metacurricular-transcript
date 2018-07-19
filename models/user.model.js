/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

//Dependencies
const mongoose = require('mongoose');

//Defining Schema --> TENTATIVE USER SCHEMA
const userSchema = mongoose.Schema(
    {
        //userId --> auto-generated

        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        habibId: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        userType: { type: String, required: true }  //userType can be 'student', 'administrator' or 'supervisor'.
    }
);

const UserModel = exports.UserModel = mongoose.model('UserModel', userSchema);