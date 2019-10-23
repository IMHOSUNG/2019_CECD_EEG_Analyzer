var express =require('express')
var multer = require('multer')
var upload = multer({ dest: 'upload/'})
var fs = require('fs');
var amqp = require('amqplib/callback_api')
var con = require('../db/dbconfig');
var router = express.Router();

function generateUuID() {
    return Math.random().toString() + 
           Math.random().toString() +
           Math.random().toString()
}


router.get('/gender',(req,res,next)=>{

    var sql = `SELECT gender, COUNT(*) as count FROM braindata GROUP BY gender`;

    con.query(sql,function(err,rows){
        if(err)
            console.log(err);

        console.log(rows);
        res.send(rows);
    })
})

router.get('/age',(req,res,next)=>{

    var sql = `SELECT age, COUNT(*) as count FROM braindata GROUP BY age`;

    con.query(sql,function(err,rows){
        if(err)
            console.log(err);

        console.log(rows);
        res.send(rows);
    })

})

router.get('/brain/age/:id', (req,res,next)=>{

    // MQ >> Python 요청
    // 데이터 
    // json 형태로 데이터 받아오기 

    //this server is RPC Client 
    amqp.connect(`amqp://root:root@localhost`, function(error0, connection){
        if(error0){
            res.send(error0)
            console.log(error0);
            throw error0;
        }

        connection.createChannel(function(error1, ch){
            if(error1){
                throw error1;
            }

            ch.assertQueue('' ,{
                exclusive : true,
                autoDelete : true
            },function(error2, q){
                if(error2){
                    throw error2;
                }

                var correlationId = generateUuID();
                var age = req.params.id.toString();

                var sql = 'SELECT * FROM braindata WHERE age=?'
                con.query(sql,age,function(err,data){
                    if(err){
                        console.log(err);
                    }
                    
                    console.log('[x] Requesting Python age argument %s', data);

                    ch.consume(q.queue, function(msg){
                        if(msg.properties.correlationId == correlationId){
                            console.log('[.] Got %s', msg.content.toString());

                            res.send(msg.content.toString());
                            ch.close();
                        }
                    },{
                        noAck : true
                    });

                    //console.log(`this is get data from db ${JSON.stringify(data)}`);

                    //JSON 형태로 보냄 
                    ch.sendToQueue('rpc_queue',Buffer.from(JSON.stringify(data)),{
                        correlationId : correlationId,
                        replyTo : q.queue
                    });
                })
            })
        })
    })

 //   console.log(getDataUsingAge(req.params.id));
 //   res.send(getDataUsingAge(req.params.id))
})

router.get('/brain/gender/:id',(req,res,next)=>{

    
    // MQ >> Python 요청
    // 데이터 
    // json 형태로 데이터 받아오기 

    //this server is RPC Client 
    amqp.connect(`amqp://root:root@localhost`, function(error0, connection){
        if(error0){
            res.send(error0)
            console.log(error0);
            throw error0;
        }

        connection.createChannel(function(error1, ch){
            if(error1){
                throw error1;
            }

            ch.assertQueue('' ,{
                exclusive : true
            },function(error2, q){
                if(error2){
                    throw error2;
                }

                var correlationId = generateUuID();
                var age = req.params.id.toString();

                var sql = 'SELECT * FROM braindata WHERE gender=?'
                con.query(sql,age,function(err,data){
                    if(err){
                        console.log(err);
                    }
                    
                    console.log('[x] Requesting Python age argument %s', data);

                    ch.consume(q.queue, function(msg){
                        if(msg.properties.correlationId == correlationId){
                            console.log('[.] Got %s', msg.content.toString());

                            res.send(msg.content.toString());
                        }
                    },{
                        noAck : true
                    });

                    //console.log(`this is get data from db ${JSON.stringify(data)}`);

                    //JSON 형태로 보냄 
                    ch.sendToQueue('rpc_queue',Buffer.from(JSON.stringify(data)),{
                        correlationId : correlationId,
                        replyTo : q.queue
                    });
                })
            })
        })
    })
})

router.get('/brain/all',(req,res,next)=>{

    
    // MQ >> Python 요청
    // 데이터 
    // json 형태로 데이터 받아오기 

    //this server is RPC Client 
    amqp.connect(`amqp://root:root@localhost`, function(error0, connection){
        if(error0){
            res.send(error0)
            console.log(error0);
            throw error0;
        }

        connection.createChannel(function(error1, ch){
            if(error1){
                throw error1;
            }

            ch.assertQueue('' ,{
                exclusive : true
            },function(error2, q){
                if(error2){
                    throw error2;
                }

                var correlationId = generateUuID();

                var sql = 'SELECT * FROM braindata'
                con.query(sql,function(err,data){
                    if(err){
                        console.log(err);
                    }
                    
                    console.log('[x] Requesting Python age argument %s', data);

                    ch.consume(q.queue, function(msg){
                        if(msg.properties.correlationId == correlationId){
                            console.log('[.] Got %s', msg.content.toString());

                            res.send(msg.content.toString());
                        }
                    },{
                        noAck : true
                    });

                    //console.log(`this is get data from db ${JSON.stringify(data)}`);

                    //JSON 형태로 보냄 
                    ch.sendToQueue('rpc_queue',Buffer.from(JSON.stringify(data)),{
                        correlationId : correlationId,
                        replyTo : q.queue
                    });
                })
            })
        })
    })
})

module.exports = router