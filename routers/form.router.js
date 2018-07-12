/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

//Establishing the routes for form model

//Dependencies
const config = require('../config');
const formModel = require('../models/form.model');

const FormModel = formModel.FormModel;

/*
method: addForm(expressInstance)
url: domain/form
request object:
response object
*/
addForm = function(expressInstance)
{
    expressInstance.post('/form', (req, res) => {
        //If form of particular studentId exists, then don't add the form.
        
    });
}