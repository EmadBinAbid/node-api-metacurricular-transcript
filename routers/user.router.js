/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

//Establishing the routes for user model

//Dependencies
const config = require('../config');
const userModel = require('../models/user.model');

const UserModel = userModel.UserModel;

/*
method: addUser(expressInstance)
url: domain/user
response type: sends a json object of type { "user": object } if it doesn't exist already. Else sends "Unauthorized"
*/
addUser = function(expressInstance)
{
    expressInstance.post('/user', (req, res) => {

        //Checking User already exists.
        UserModel.findOne( { "habibId": req.body.user.habibId },  (err, userObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                if(userObject === null)
                {
                    console.log(userObject);
                    //Adding User if it doesn't exist.
                    if(req.body.user.userType === 'student' || req.body.user.userType === 'administrator' ||
                    req.body.user.userType === 'supervisor')
                    {
                        UserModel.create(req.body.user, (err, userObject) => 
                        {
                            if(err)
                            {
                                console.log("EMMMMMAAAAAAAAAAAAADDDDDDDDDD");
                                res.status(400).send("Bad Request");
                            }
                            else
                            {
                                res.json( { "user": userObject } );
                            }
                        });
                    }
                    else
                    {
                        res.status(400).send("Bad Request");
                    }
                }
                else
                {
                    res.status(401).send("Unauthorized");
                }
            }
        });
    });
}

/*
method: getUser(expressInstance)
url: domain/user?habibId
response type: sends a json object of type { "user": object } if it exists. Else sends { "user": null }
*/
getUser = function(expressInstance)
{
    expressInstance.get('/user', (req, res) => {
        UserModel.findOne( { "habibId": req.query.habibId },  (err, userObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                res.json( { "user": userObject } );
            }
        });
    });
}

/*
method: getAllUsers(expressInstance)
url: domain/user/all-users
response type: sends an array of objects of type { "user": object }[] if it exists. Else sends "Bad Request"
*/
getAllUsers = function(expressInstance)
{
    expressInstance.get('/user/all-users', (req, res) => {
        UserModel.find( (err, userObject) => 
        {
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                res.json( { "user": userObject } );
            }
        });
    });
}

//CRUD operations at one place
exports.createRoutes = function(expressInstance, jwtInstance, verifyToken)
{
    addUser(expressInstance);
    getUser(expressInstance);
    getAllUsers(expressInstance);
}