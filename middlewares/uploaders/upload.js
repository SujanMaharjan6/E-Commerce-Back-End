

const multer =  require('multer');
const path =  require('path');



const filter = function(req,file,cb){
    const myFilter = file.mimetype.split('/')[0];
    if(myFilter === 'image')
    {
        cb(null, true);
    }
    else
    {
        req.fileError = true;
        cb(null, false);
    }
}

const myStorage = multer.diskStorage({
    filename: function(req,file,cb)
    {
        cb(null, Date.now() + '-' + file.originalname);
    },
    destination: function(req, file, cb)
    {
        cb(null, path.join(process.cwd(), 'uploads/images'));
    }
})

const upload = multer({
    storage: myStorage,
    fileFilter: filter
})

module.exports = upload;