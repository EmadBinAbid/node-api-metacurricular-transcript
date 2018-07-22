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
method: addCategory(expressInstance)
url: domain/category
request object: expects an object of type { "category": Object }
response object: sends an object of type { "category": Object }
*/
addCategory = function(expressInstance)
{
    expressInstance.post('/category', (req, res) => 
    {
        CategoryModel.findOne({ keyName: req.body.category.keyName }, (err, categoryObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                if(categoryObject === null)
                {
                    CategoryModel.create(req.body.category, (err, categoryObject) => 
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
                }
                else
                {
                    console.log("sdgsdfhdfh");
                    res.status(400).send("Bad Request");
                }
            }
        });
    });
}

/*
method: getAllCategories(expressInstance)
url: domain/category/all-categories
request object: none
response object: sends an array of objects of type { "category": Object }[]
*/
getAllCategories = function(expressInstance)
{
    expressInstance.get('/category/all-categories', (req, res) => 
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
    addCategory(expressInstance);
    getAllCategories(expressInstance);
}