import express from 'express';
import * as controller from '../controller/getController';
let router = express.Router();

router.get('/', controller.getIndex);
router.get('/brain/all', async(req,res)=>{await controller.getOverView(req,res)});
router.get('/brain/age', async(req,res)=>{await controller.getDataAboutAge(req,res)});
router.get('/brain/gender',async(req,res)=>{await controller.getDataAboutGender(req,res)});

module.exports = router;
