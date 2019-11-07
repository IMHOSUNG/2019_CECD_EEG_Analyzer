import { getDataFromDB } from '../db/function';
import { remoteCall } from '../lib/rpcLib'

export const getIndex = (req,res,next) => {
    const test = "access /upload router"
    console.log('access /upload router ');
    res.render("board")
}

export const getOverView = async(req,res)=>{

    let sqlAge = 'SELECT MID(age,1,1)*10  as age , COUNT(*) as count FROM users GROUP BY MID(age,1,1)*10';
    let sqlGender = 'SELECT gender, COUNT(*) as count FROM users GROUP BY gender';
    let sqlValue = 'SELECT avg(`value`) as value , `sec`  FROM braindata group by `sec`';
       
    let ageAvgCount = await getDataFromDB(sqlAge);
    let genderAvgCount = await getDataFromDB(sqlGender);
    let brainBetaAvgValue = await getDataFromDB(sqlValue);

    let returnData = {
        "age" : ageAvgCount,
        "gender " : genderAvgCount,
        "brainRawValue" : brainBetaAvgValue,
        "seasonalValue" : null
    };

    let ret = await remoteCall(returnData, res);
    res.send(ret);
}

export const getDataAboutAge = async(req,res) => {

    let json = {};
    let sqlAge = 'SELECT MID(age,1,1)*10  as age , COUNT(*) as count FROM users GROUP BY MID(age,1,1)*10';
    let sqlGender = 'SELECT COUNT(*) as count FROM users WHERE age BETWEEN ? and ? GROUP BY `gender`';
    let sqlValue = 'SELECT avg(`value`) as value , `sec`  FROM braindata WHERE age BETWEEN ? and ?  GROUP BY `sec`';
    let ageAvgCount = await getDataFromDB(sqlAge);

    for( let element of ageAvgCount){
        let brainBetaAvgValue = await getDataFromDB(sqlValue,parseInt(element.age),parseInt(element.age)+9);
        let genderAvgCount = await getDataFromDB(sqlGender,parseInt(element.age),parseInt(element.age)+9);
        let returnData = {
            "ages" : element.age,
            "count" : element.count,
            "gender" : genderAvgCount,
            "brainRawValue" : brainBetaAvgValue,
            "seasonalValue" : null
        };
        let ret = await remoteCall(returnData, res);
        json[element.age] = ret;
    }


    res.send(JSON.stringify(json));
}

export const getDataAboutGender = async(req,res) => {
    
    let json = {};

    let sqlGender = 'SELECT gender , COUNT(*) as count FROM users GROUP BY `gender`';
    let sqlAge = 'SELECT MID(age,1,1)*10  as age , COUNT(*) as count FROM users WHERE gender = ? GROUP BY MID(age,1,1)*10';
    let sqlValue = 'SELECT avg(`value`) as value , `sec`  FROM braindata WHERE gender = ?  GROUP BY `sec`';
    let genderAvgCount = await getDataFromDB(sqlGender);

    for( let element of genderAvgCount){
        let brainBetaAvgValue = await getDataFromDB(sqlValue,parseInt(element.gender));
        let ageAvgCount = await getDataFromDB(sqlAge,parseInt(element.gender));
        let returnData = {
            "gender" : element.gender,
            "count" : element.count,
            "ages" : ageAvgCount,
            "brainRawValue" : brainBetaAvgValue,
            "seasonalValue" : null
        };
        let ret = await remoteCall(returnData, res);
        json[element.gender] = ret;
    }

    res.send(JSON.stringify(json));
}
