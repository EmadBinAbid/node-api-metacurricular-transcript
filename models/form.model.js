/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

//Dependencies
const mongoose = require('mongoose');

//Defining Schema --> TENTATIVE FORM SCHEMA
const formSchema = mongoose.Schema(
    {
        //formId --> auto-generated

        firstName: 
        { type: String, required: true },
        lastName: 
        { type: String, required: true },
        studentId: 
        { type: String, required: true },
        school: 
        { type: String, required: true },
        major: 
        { type: String, required: true }
        
    }
);

const FormModel = exports.FormModel = mongoose.model('FormModel', formSchema);