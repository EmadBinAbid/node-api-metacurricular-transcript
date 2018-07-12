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
response object: 
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

//CRUD operations at one place
exports.createsRoutes = function(expressInstance, jwtInstance, verifyToken)
{
    addForm(expressInstance);
}