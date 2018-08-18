/*
@author: Emad Bin Abid
@date: August 17, 2018
*/

//Establishing the routes for transcript requests

//Dependencies
const fs = require('fs');

const config = require('../config');
const formModel = require('../models/form.model');
const transcriptLatex = require('../transcript.latex');

const FormModel = formModel.FormModel;

/*
method: downloadTranscriptByStudentId(expressInstance, jwtInstance, verifyToken)
url: domain/transcript/download?studentID=
request object: a query string with key=studentID
response object: sends a download version of file after fetching it from directory
*/
downloadTranscriptByStudentId = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/transcript/download'/*, verifyToken*/, (req, res) => {
        /*jwtInstance.verify(req.token, config.jwt_key, (err, userData) => {
            if(err)
            {
                res.status(401).send("Unauthorized");
            }
            else
            {*/
                FormModel.findOne({ "studentID": req.query.studentID }, (err, formObject)=> {
                    if(err)
                    {
                        res.status(400).send("Bad Request");
                    }
                    else
                    {
                        var studentID = req.query.studentID.substring(2, 7);
                        var isFileFound = true;

                        fs.readdir('./public/transcripts/', (err, folders) => {
                            folders.forEach(folder => {
                                if(folder === studentID)
                                {
                                    fs.readdir('./public/transcripts/' + studentID + '/', (err, files) => {
                                        files.forEach(file => {
                                            if(file === "document.pdf")
                                            {
                                                var file = fs.createReadStream(`./public/transcripts/${studentID}/document.pdf`);
                                                var stat = fs.statSync(`./public/transcripts/${studentID}/document.pdf`);
                                                res.setHeader('Content-Length', stat.size);
                                                res.setHeader('Content-Type', 'application/pdf');
                                                file.pipe(res);
                                            }
                                        });
                                        // res.send("Transcript not found!");
                                    });
                                }
                            }); 
                            //res.send("Transcript not found!");                       
                        });
                    }
                });
            /*}
        });*/
    });
}

generateTranscriptByStudentId = function(expressInstance, jwtInstance, verifyToken)
{
    expressInstance.get('/transcript', (req, res) => {
        transcriptLatex.generateTranscript(req.query.studentID);
        res.status(200).send("OK");
    });
}

exports.createRoutes = function(expressInstance, jwtInstance, verifyToken)
{
    downloadTranscriptByStudentId(expressInstance, jwtInstance, verifyToken);
    generateTranscriptByStudentId(expressInstance, jwtInstance, verifyToken);
}