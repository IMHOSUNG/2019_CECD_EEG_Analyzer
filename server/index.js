import express, { urlencoded, json } from 'express';
import ejs from 'ejs';
import { join } from 'path';
import postRouter from './router/post.js';
import indexRouter from './router/index';
import getRouter from './router/get.js';

import swaggerSpec from './swaggerConfig';
import { serve, setup } from 'swagger-ui-express';

var app = express();
var port = 3000;

app.use(urlencoded({extended : true}));
app.use(json());
app.set('port',  process.env.PORT|| 3000);
app.set('views', join(__dirname,"views"));
app.set("view engine","ejs");
app.use('/api-docs',serve,setup(swaggerSpec));
app.use('/',indexRouter);
app.use('/post',postRouter);
app.use('/get',getRouter);

app.listen(port, function() {
  console.log(`listen ${port}`)
})

