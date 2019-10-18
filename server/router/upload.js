var express =require('express')
var multer = require('multer')
var upload = multer({ dest: 'upload/'})
var fs = require('fs')
var connection = require('../db/dbconfig');
var router = express.Router();
const request = require('request-promise')


function deleteFile(req) {
  fs.unlink(req.file.path, function(err){
    if( err ) throw err;
    console.log('file deleted');
  });
}

function InsertDB(age,gender,value) {

  //데이터 180개 인지 확인
    console.log(value.length);
    if(value.length != 180){
        console.log(`Warnning : this data length is not 180`);
    }
    
    var sql = "INSERT INTO braindata (age,gender,value,sec) VALUES (?,?,?,?)"; 
    value.forEach((element)=>{
        var params = [parseInt(age), parseInt(gender), parseFloat(element.value), parseInt(element.time)];
        console.log(params);
        connection.query(sql,params,function(err,rows){
           if(err){
             console.log(err);
           }
           console.log(rows.InsertId);
        })
    })
}

function makeSec(timeArr){
  var mul = [3600,60,1];
  var answer = 0;
  for(var i = 0 ; i < 3 ; i++){
    answer += mul[i]*parseInt(timeArr[i]); 
  }
  return answer;
}

function timeCal(secTime, start_time){

  var t1 = start_time.split(':');
  var t2 = secTime.split(':');
  var start = makeSec(t1);
  var end = makeSec(t2);
  return Math.abs(end-start);
}

function brainCal(arr,age,gender,start_time,temp){
  var index = temp[0];
  var brain_beta = temp[2];
  var brain_beta_2 = temp[7];
  //console.log(`beta ${brain_beta} beta7 ${brain_beta_2}`)
  var brain_value = (2*parseFloat(brain_beta) + parseFloat(brain_beta_2) )/3; 
  //console.log(`brain value ${brain_value}`)
  var secTime = temp[12].split('.')[0];
  var time = timeCal(secTime, start_time);

  if(arr[parseInt(time)]==undefined){
    arr[parseInt(time)] = 0;
  }

  if(arr[parseInt(time)] != undefined){
    arr[parseInt(time)] += parseFloat(brain_value);
  }

  return arr;
}

function parseFunction(data,age,gender,arr,size) {
  var sumArray = new Array(size);
  var zero_count = 0;
  var start_time = 0;
  var str = data.toString().split('\n');
  //이상하게 들어오는 경우 있어서 앞에 3초 자름
  str.forEach((element)=>{
      var temp = element.split(',');
      if(temp[0] == 0){
        zero_count++;
      }

      if(zero_count > 3){  
        if(temp.length > 3){
          sumArray = brainCal(arr,age,gender,start_time,temp);
        }
      }else{
        if(temp.length > 3){
          start_time = temp[12].split('.')[0];  
        }
      }
  })

  return sumArray;
}

router.get('/', (req,res,next)=>{

    const test = "access /upload router"
    console.log('access /upload router ');
    res.render("board")
});

router.post('/create', upload.single('textfile'), (req,res,next)=>{

    //set array size;
    //180초 3분 단위 
    var arr = new Array(180);
    var answer =new Array(180);

    //post로 나이와 성별 정보를 받음
    var age = req.body.age;
    var gender = req.body.gender;

    var count = 1;
    var jsonarg = new Array();
    var jsonfile = new Object();
    jsonfile.age = age;
    jsonfile.gender = gender;

    //요기가 post로 넘어온 파일 내부에 string 읽어오는 부분
    fs.readFile(req.file.path,'utf-8',(err,data)=>{
 
        answer = parseFunction(data,age,gender,arr,256);
        answer.forEach((value)=>{
          //1초에 256개의 개수가 들어오니까 256으로 나눠서 avg 구함
          jsonarg.push({ time : count++ , value : value/256.0})
        })
        
        jsonfile.value = jsonarg;
        InsertDB(age,gender,jsonfile.value);
        res.send(JSON.stringify(jsonfile))
        res.end();
    })

    deleteFile(req);
})


module.exports = router