import * as fs from 'fs'

export const deleteFile = (req) => {
    fs.unlink(req.file.path, function(err){
        if( err ) throw err;
        console.log('file deleted');
    });
}

export const generateUuID = () => {
    return Math.random().toString() + 
           Math.random().toString() +
           Math.random().toString()
}

export const makeSec = (timeArr) => {
    let mul = [3600,60,1];
    let answer = 0;
    for(let i = 0 ; i < 3 ; i++){
      answer += mul[i]*parseInt(timeArr[i]); 
    }
    return answer;
}

export const timeCal = (secTime, start_time) => {

    let t1 = start_time.split(':');
    let t2 = secTime.split(':');
    let start = makeSec(t1);
    let end = makeSec(t2);
    return Math.abs(end-start);
}

export const brainCal = (arr,age,gender,start_time,temp) => {
    let brain_beta = temp[2];
    let brain_beta_2 = temp[7];
    //console.log(`beta ${brain_beta} beta7 ${brain_beta_2}`)
    let brain_value = (2*parseFloat(brain_beta) + parseFloat(brain_beta_2) )/3; 
    //console.log(`brain value ${brain_value}`)
    let secTime = temp[12].split('.')[0];
    let time = timeCal(secTime, start_time);
  
    if(arr[parseInt(time)]==undefined){
      arr[parseInt(time)] = 0;
    }
  
    if(arr[parseInt(time)] != undefined){
      arr[parseInt(time)] += parseFloat(brain_value);
    }
  
    return arr;
}

export const calInclination = (data) => {

  let json = {
    "positiveMax" : 0,
    "positiveMin" : 0,
    "nagativeMax" : 0,
    "nagativeMin" : 0,
    "array" : []
  };

  for(let i = 0 ; i < data.trend.length - 1 ; ++i){
    json.array.push(data.trend[i+1]-data.trend[i]);
  }
  
  return json;
}

