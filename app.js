/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

//Application dependencies
    //custom dependencies
const server = require('./server');
const connection = require('./connection.mongoose');
const authentication = require('./authentication.mongoose');
const userRouter = require('./routers/user.router');
const formRouter = require('./routers/form.router');
const categoryRouter = require('./routers/category.router');

    //npm dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();

//Middlewares
app.use(express.json());    //To parse json objects sent by the client.
app.use(cors());            //To resolve cross-origin browser issues.

//Creating routes
userRouter.createRoutes(app, jwt, authentication.verifyToken);
formRouter.createsRoutes(app, jwt, multer, authentication.verifyToken);
categoryRouter.createsRoutes(app);

//Validating user
authentication.validateUser(app, jwt);

//Running the server
server.run(app, 3000);

//Connecting to database
connection.connect(mongoose);