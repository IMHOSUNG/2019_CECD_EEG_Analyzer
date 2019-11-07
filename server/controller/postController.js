import * as fs from 'fs';
import { postDataFromClient } from '../db/function'
import { parseFunction } from '../lib/parseLib'
import { deleteFile } from '../lib/lib'

export const insertData = (req,res,next)=>{
    //set array size;
    //180초 3분 단위 
    let arr = new Array(180);
    let answer =new Array(180);

    //post로 나이와 성별 정보를 받음
    let age = req.body.age;
    let gender = req.body.gender;

    let count = 1;
    let jsonarg = new Array();
    let jsonfile = new Object();
    jsonfile.age = age;
    jsonfile.gender = gender;

    //요기가 post로 넘어온 파일 내부에 string 읽어오는 부분
    fs.readFile(req.file.path,'utf-8',async(err,data)=>{
    
        answer = parseFunction(data,age,gender,arr,256);
        answer.forEach((value)=>{
            //1초에 256개의 개수가 들어오니까 256으로 나눠서 avg 구함
            jsonarg.push({ time : count++ , value : value/256.0})
        })
        
        jsonfile.value = jsonarg;
        await postDataFromClient(age,gender,jsonfile.value);
        res.send(JSON.stringify(jsonfile))
        res.end();
    })

    deleteFile(req);
}
