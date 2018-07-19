/*
@author: Emad Bin Abid
@date: July 19, 2018
*/

//Dependencies
const mongoose = require('mongoose');

//Defining Schema --> TENTATIVE CATEGORY SCHEMA
const categorySchema = mongoose.Schema(
    {
        //categoryId --> auto-generated
        
        categoryName: { type: String, required: true },
        supervisorHabibId: { type: String, required: true },

    }
);

const CategoryModel = exports.CategoryModel = mongoose.model('CategoryModel', categorySchema);