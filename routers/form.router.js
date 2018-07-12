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
request object: expects an object of type { "form": Object }
response object: sends an object of type { "form": Object } if it doesn't exist earlier.
*/
addForm = function(expressInstance)
{
    expressInstance.post('/form', (req, res) => {
        //If form of particular studentId exists, then don't add the form.
        FormModel.findOne( { "studentId": req.body.form.studentId }, (err, formObject)=>{
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                if(formObject === null)
                {
                    FormModel.create(req.body.form, (err, formObject)=>{
                        if(err)
                        {
                            res.status(400).send("Bad Request");
                        }
                        else
                        {
                            res.json({ "form": formObject });
                        }
                    });
                }
                else
                {
                    res.status(401).send("Unauthorized");
                }
            }
        } );
    });
}

/*
method: getFormById(expressInstance, jwtInstance, verifyToken)
url: domain/form?studentId
request object: a query string with key=studentId
response object: sends an object of type { "form": Object }
*/
getFormById = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/form', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, userData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                FormModel.findOne({ "studentId": req.query.studentId }, (err, formObject)=> {
                    if(err)
                    {
                        res.status(400).send("Bad Request");
                    }
                    else
                    {
                        res.json({ "form": formObject });
                    }
                });
            }
        });
    });
}

/*
method: getAllForms(expressInstance, jwtInstance, verifyToken)
url: domain/form/all-forms
request object: none
response object: sends an object of type { "form": Object }
*/
getAllForms = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/form/all-forms', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, userData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                FormModel.find((err, formObject)=> {
                    if(err)
                    {
                        res.status(400).send("Bad Request");
                    }
                    else
                    {
                        res.json({ "form": formObject });
                    }
                });
            }
        });
    });
}

//CRUD operations at one place
exports.createsRoutes = function(expressInstance, jwtInstance, verifyToken)
{
    addForm(expressInstance);
    getFormById(expressInstance, jwtInstance, verifyToken);
    getAllForms(expressInstance, jwtInstance, verifyToken);
}