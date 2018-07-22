/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

//Establishing the routes for form model

//Dependencies
const fs = require('fs');
const archiver = require('archiver');
const util = require('util');

const config = require('../config');
const formModel = require('../models/form.model');
const categoryModel = require('../models/category.model');

const FormModel = formModel.FormModel;
const CategoryModel = categoryModel.CategoryModel;

/*
method: addForm(expressInstance, multerInstance)
url: domain/form
request object: expects an object of type Object
response object: sends an object of type { "form": Object } if it doesn't exist earlier.
*/
addForm = function(expressInstance, multerInstance)
{
    expressInstance.post('/form', multerInstance(config.multerConfig).array('upload', 20), (req, res) => {
        //If form of particular studentId exists, then don't add the form.
        FormModel.findOne( { "studentID": req.body.studentID }, (err, formObject)=>{
            if(err)
            {
                res.status(400).send("Bad Request");
            }
            else
            {
                if(formObject === null)
                {
                    //Before creating a db entry filename of uploaded file needs to be entered in requestObject
                    
                    var uploadArray = [];
                    var tempArray = [];
                    for(var i=0; i<req.files.length; i++)
                    {
                        uploadArray.push(req.files[i].filename);
                        tempArray.push(req.files[i].filename.split('.')[0]);
                    }
                    //requestObject.uploads = uploadArray;
                    
                    Object.keys(req.body).forEach(function(key)
                    {
                        if(key.toLowerCase().includes('category'))
                        {
                            //ea02893_leadershipCategory_0
                            for(var i=0; i<req.body[key].length; i++)
                            {
                                var validIndex = tempArray.indexOf(req.body.studentID + '_' + key + '_' + i.toString());
                                if( validIndex != -1)
                                {
                                    req.body[key][i].fileUpload = uploadArray[validIndex];
                                }
                                else
                                {
                                    console.log(uploadArray);
                                }
                            }
                        }
                    });

                    const requestObject = req.body;
                    FormModel.create(requestObject, (err, formObject)=>
                    {
                        if(err)
                        {
                            console.log(err);
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
method: changeApprovedStatus(expressInstance, jwtInstance, verifyToken)
url: domain/form/supervisor
request object: expects an object of type { "form": { studentId=, isApproved=, categoryName=, _id= } }
response object: sends an object of type { "form": Object }.
*/
changeApprovedStatus = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.put('/form/supervisor', verifyToken, (req, res) => 
    {
        jwtInstance.verify(req.token, config.jwt_key, (err, userObject) => 
        {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {
                const query = { 
                    studentId: req.body.form.studentId,
                    [req.body.form.categoryName]: { $elemMatch: { _id: req.body.form._id } }
                };

                const update = {
                    '$set': { [util.format("%s.$.isApproved", req.body.form.categoryName)] : req.body.form.isApproved }
                };

                console.log(update);
                FormModel.findOneAndUpdate(query, update, {new: true} , (err, formObject) => 
                {
                    //console.log(formObject);
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
method: getUploadsById(expressInstance, jwtInstance, verifyToken)
url: domain/form/uploads?studentId
request object: a query string with key=studentId
response object: sends an object of type { "form": { "uploads": Object } }
*/
getUploadsByStudentId = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/form/uploads', verifyToken, (req, res) => {
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
                        res.json({ "form": { "uploads": formObject.uploads } });
                    }
                });
            }
        });
    });
}

/*
method: getFormCategoriesBySupervisorId(expressInstance, jwtInstance, verifyToken)
url: domain/form/categories
request object: none
response object: sends an object of type ....
*/
getFormCategoriesBySupervisorId = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/form/categories', verifyToken, (req, res) => {
        jwtInstance.verify(req.token, config.jwt_key, (err, userData) => {
            if(err)
                res.status(401).send("Unauthorized");
            else
            {
                CategoryModel.find({ "supervisorHabibId": userData.user.habibId }, (err, categoryObject) => 
                {
                    if(err)
                        res.status(401).send("Unauthorized");
                    else
                    {
                        var categoryArray = categoryObject;
                        var responseArray = [];

                        FormModel.find( (err, formObject) => {
                            if(err)
                                res.status(400).send("Bad Request");
                            else
                            {
                                //console.log(categoryArray);

                                var formObjectArray = formObject;
                                for(var j=0; j<formObjectArray.length; j++)
                                {
                                    var responseArrayObject = { 
                                        "studentID": formObjectArray[j].studentID,
                                        "firstName": formObjectArray[j].firstName,
                                        "lastName": formObjectArray[j].lastName,
                                        "major": formObjectArray[j].major
                                    };
                                    for(var i=0; i<categoryArray.length; i++)
                                    {
                                        responseArrayObject[categoryArray[i].keyName] = [];
                                        console.log(categoryArray[i]);
                                        responseArrayObject[categoryArray[i].keyName] = formObject[j][categoryArray[i].keyName];
                                    }
                                    responseArray.push(responseArrayObject);
                                }
                                res.json(responseArray);
                            }
                        } );
                    }
                });
            }
        });
    });
}

/*
method: viewUploadById(expressInstance, jwtInstance, verifyToken)
url: domain/form/upload/view?studentId=&filename=
request object: two query strings with key=studentId and key=filename
response object: sends a file after fetching it from directory
*/
viewUploadByStudentId = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/form/upload/view', verifyToken, (req, res) => {
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
                        const requestFilename = req.query.filename;
                        var data = fs.readFileSync(`./public/uploads/${requestFilename}`);
                        res.contentType("application/pdf");
                        res.send(data);
                    }
                });
            }
        });
    });
}

/*
method: downloadUploadByStudentId(expressInstance, jwtInstance, verifyToken)
url: domain/form/upload/download?studentId=&filename=
request object: a query string with key=studentId and key=filename
response object: sends a download version of file after fetching it from directory
*/
downloadUploadByStudentId = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/form/upload/download', verifyToken, (req, res) => {
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
                        const requestFilename = req.query.filename;

                        var file = fs.createReadStream(`./public/uploads/${requestFilename}`);
                        var stat = fs.statSync(`./public/uploads/${requestFilename}`);
                        res.setHeader('Content-Length', stat.size);
                        res.setHeader('Content-Type', 'application/pdf');
                        file.pipe(res);
                        
                        // var img = fs.readFileSync('./public/uploads/ea02893_StudentLeadership.png_1531499163729.png');
                        // res.writeHead(200, { 'Content-Type': 'image/png' });
                        // res.end(img, 'binary');
                        
                    }
                });
            }
        });
    });
}

/*
method: downloadAllUploadsByStudentId(expressInstance, jwtInstance, verifyToken)
url: domain/form/uploads/download?studentId
request object: a query string with key=studentId
response object: sends a download version of zipped file containing all uploads of a student
*/
downloadAllUploadsByStudentId = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/form/uploads/download', verifyToken, (req, res) => {
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
                        const archive = archiver('zip');

                        const filename = `${req.query.studentId}.zip`;
                        const uploadedFilesArray = formObject.uploads;
                        var files = [];

                        for(var i=0; i<uploadedFilesArray.length; i++)
                        {
                            files.push(`./public/uploads/${uploadedFilesArray[i]}`);
                        }

                        res.attachment(filename);
                        archive.pipe(res);

                        console.log("Hereetetet");

                        for(const i in files)
                        {
                            archive.file(files[i], { name: files[i] });
                        }
                        archive.finalize();
                    }
                });
            }
        });
    });
}

/*
method: getFormByStudentId(expressInstance, jwtInstance, verifyToken)
url: domain/form?studentId
request object: a query string with key=studentId
response object: sends an object of type { "form": Object }
*/
getFormByStudentId = function(expressInstance, jwtInstance, verifyToken)
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
exports.createsRoutes = function(expressInstance, jwtInstance, multerInstance, verifyToken)
{
    addForm(expressInstance, multerInstance);
    changeApprovedStatus(expressInstance, jwtInstance, verifyToken);
    getUploadsByStudentId(expressInstance, jwtInstance, verifyToken);
    getFormCategoriesBySupervisorId(expressInstance, jwtInstance, verifyToken);
    viewUploadByStudentId(expressInstance, jwtInstance, verifyToken);
    downloadUploadByStudentId(expressInstance, jwtInstance, verifyToken);
    downloadAllUploadsByStudentId(expressInstance, jwtInstance, verifyToken);
    getFormByStudentId(expressInstance, jwtInstance, verifyToken);
    getAllForms(expressInstance, jwtInstance, verifyToken);
}