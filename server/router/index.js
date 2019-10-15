const express =require('express');

const router = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - index
 *     description: access Index check server status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 */
router.get('/', (req,res,next)=>{

    console.log('access / ');
    res.send(200);
});

module.exports = router