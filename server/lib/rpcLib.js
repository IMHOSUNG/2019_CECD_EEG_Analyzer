import { setMQConnect } from '../amqp/connectSet';
import { generateUuID } from '../lib/lib';

export const remoteCall = async(returnData, res) => {
    let conn = await setMQConnect();
    let ch = await conn.createChannel();
    let correlationId = generateUuID();

    let q = await ch.assertQueue('',{
        durable : false,
        exclusive : true,
        autoDelete : true
    });
    +
    console.log('[x] Requesting Python Deamon %s', returnData);
    let ret = new Promise((resolve,reject)=>{
        ch.consume(q.queue,
            (msg)=>{
            if(msg.properties.correlationId == correlationId){
                console.log('[.] Got %s', msg.content.toString());
                let data = msg.content.toString();
                // json의 키 값이 작은 따움표로 둘러 쌓여 넘어오는 경우가 있어서
                // 그 부분 예외 처리
                returnData.seasonalValue = JSON.parse(data.replace(/'/gi,'"'));
                ch.close();
                conn.close();
                resolve(returnData);
                //return JSON.stringify(returnData);
            }
        },{
            noAck : true
        })
    });

    ch.sendToQueue('rpc_queue',Buffer.from(JSON.stringify(returnData.brainRawValue)),{
        correlationId : correlationId,
        replyTo : q.queue
    });

    return ret;
}