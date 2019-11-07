import express from 'express';
import multer from 'multer';
import * as controller from '../controller/postController';
const UPLOAD_PATH = 'upload';
let upload = multer({ dest: `${UPLOAD_PATH}/` });
let router = express.Router();

router.post('/create', upload.single('textfile'), (req,res,next)=>controller.insertData(req,res,next));

module.exports = router;