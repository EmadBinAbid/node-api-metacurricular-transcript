/*
@author: Emad Bin Abid
@date: July 19, 2018
*/

//Establishing the routes for category model

//Dependencies
const config = require('../config');
const categoryModel = require('../models/category.model');

const CategoryModel = categoryModel.CategoryModel;

/*
method: getAllCategories(expressInstance, jwtInstance, verifyToken)
url: domain/category/all-categories
request object: none
response object: sends an array of objects of type { "category": Object }[]
*/
getAllCategories = function(expressInstance)
{
    expressInstance.get('category/all-categories', (req, res) => 
    {
        CategoryModel.find((err, categoryObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                res.json({ "category": categoryObject });
            }
        });
    });
}

//CRUD operations at one place
exports.createsRoutes = function(expressInstance)
{
    getAllCategories(expressInstance);
}