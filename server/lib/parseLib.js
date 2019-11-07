import { brainCal } from './lib'

export const parseFunction = (data,age,gender,arr,size) => {
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