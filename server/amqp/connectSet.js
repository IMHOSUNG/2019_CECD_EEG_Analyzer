import { amqpConfig as MQ} from './config'
import * as amqp from 'amqplib'

export const setMQConnect = async() => {
    try{
        let conn = await amqp.connect(`amqp://${MQ.ID}:${MQ.PW}@${MQ.HOST}`);
        return conn;
    }catch(err){
        console.log(err);
    }
}