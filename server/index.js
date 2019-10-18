var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path')
var express =require('express')
var ejs = require('ejs')
var uploadRouter = require('./router/upload.js')
var indexRouter = require('./router/index')
var getRouter = require('./router/get.js')


const swaggerSpec = require('./swaggerConfig')
const swaggerUi = require('swagger-ui-express')

var app = express();
var port = 3000;
var server = require('http').createServer(app);

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set('port',  process.env.PORT|| 3000);
app.set('views', path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/',indexRouter);
app.use('/upload',uploadRouter);
app.use('/get',getRouter);

app.listen(port, function() {
  console.log(`listen ${port}`)
})
/*
var server = http.createServer(function(request,response){

  var parsedUrl = url.parse(request.url);
  var resource = parsedUrl.pathname;
  console.log('resource='+resource);

  var resourcePath = '.'+resource;
  console.log('resourcePath='+resourcePath);

  // html 페이지 요청이 들어왔을 경우는 텍스트 파일 처리
  if(resource.indexOf('/html/') == 0){
    fs.readFile(resourcePath, 'utf-8', function(error, data) {
      if(error){
        response.writeHead(500, {'Content-Type':'text/html'});
        response.end('500 Internal Server '+error);
      }else{
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(data);
      }
    });

  }else if(resource.indexOf('/data/') == 0){
    // 1. stream 생성
    var stream = fs.createReadStream(resourcePath);
    // 2. 잘게 쪼개진 stream 이 몇번 전송되는지 확인하기 위한 count
    console.log(stream);
    var count = 0;
    // 3. 잘게 쪼개진 data를 전송할 수 있으면 data 이벤트 발생 
    stream.on('data', function(data) {
      count = count + 1;
      console.log(`data count=${count} and data length = ${data.length}`);
      // 3.1. data 이벤트가 발생되면 해당 data를 클라이언트로 전송
      response.write(data);
    });

    // 4. 데이터 전송이 완료되면 end 이벤트 발생
    stream.on('end', function () {
      console.log('end streaming');
      // 4.1. 클라이언트에 전송완료를 알림
      response.end();
    });

    // 5. 스트림도중 에러 발생시 error 이벤트 발생
    stream.on('error', function(err) {
      console.log(err);
      // 5.2. 클라이언트로 에러메시지를 전달하고 전송완료
      response.end('500 Internal Server '+err);
    });
  }else{
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end('404 Page Not Found');
  }
});

server.listen(80 ,() => {
  console.log('start port 80');
})
*/
