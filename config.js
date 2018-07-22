/*
@author: Emad Bin Abid
@date: July 12, 2018
*/

const multer = require('multer');

const multerConfig = exports.multerConfig = {
    storage: multer.diskStorage(
        {
            destination: function(req, file, next)
            {
                next(null, './public/uploads');
            },
            filename: function(req, file, next)
            {
                const ext = file.mimetype.split('/')[1];
                next(null, file.originalname/* + '_' + Date.now() + '.' + ext*/);
            }
        }
    ),
    fileFilter: function(req, file, next)
    {
        if(!file)
        {
            next();
        }
        // const uploadedFile = file.mimetype.startsWith('image/');
        const uploadedFile = true;
        if(uploadedFile)
        {
            next(null, true);
        }
        else
        {
            next( { message: "File type not supported." }, false);
        }
    }
};


//JWT Authentication Key
const jwt_key = exports.jwt_key = 'aQwgT1hLoMp';    //A random key.