import { setDBConnect } from './connectSet';

export const getDataFromDB = async(sql, ...params) => {
    try{
        let dbConnect = setDBConnect;
        return new Promise((resolve,reject)=>{
            dbConnect.query(sql,params,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }catch(err){
        console.log(`getDataFromDB ${err}`);
    }
}

export const insertDataInDB = async(sql, ...params) => {
    try{
        let dbConnect = setDBConnect;
        console.log(params);
        return new Promise((resolve,reject)=>{
            dbConnect.query(sql,[params],(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }catch(err){
        console.log(`insertDataInDB error ${err}`);
    }
}

export const postDataFromClient = async(age ,gender ,value) => {

    try{
        if(value.length != 180){
            console.log(`Warning : this data length is not 180`);
            //throw "this data length is not 180"
        }
        let queryUser = "INSERT INTO users (age, gender) VALUES (?)";
        let queryBrainData = "INSERT INTO braindata (age, gender, value, sec, uid) VALUES (?)";
        let result = await insertDataInDB(queryUser,parseInt(age),parseInt(gender));
        value.forEach((element)=>{
            insertDataInDB(queryBrainData,parseInt(age),parseInt(gender),parseFloat(element.value), parseInt(element.time), result.insertId);
        })
        
    }catch(err){
        console.log(`error in db function ${err}`)
    }  
}