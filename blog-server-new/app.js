import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import JWTAuth from './jwt/jwt';

// 路由文件引入
import article from './router/article';
import category from './router/category';
import friendLink from './router/friendLink';
import aplayer from './router/player';
import project from './router/project';
import cover from './router/cover';
import motto from './router/motto';
import announcement from './router/announcement';
import liveTour from './router/liveTour';
import featuredRecord from './router/featuredRecord';
import yanceyMusic from './router/yanceyMusic';
import workExperience from './router/workExperience';
import programExperience from './router/programExperience';
import about from './router/about';
import user from './router/user';
import bandwagon from './router/bandwagon';
import uploader from './tools/uploader';
import userInfo from './router/userInfo';
import globalStatus from './router/globalStatus';
import {responseClient} from './tools/constant';


const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/blog',
  {useNewUrlParser: true, useFindAndModify: false}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));

// cors解决一下跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Expose-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

app.use(JWTAuth);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    responseClient(res, 200, 1102, '帐号未登录')
  }
});
app.use('/api', article);
app.use('/api', category);
app.use('/api', friendLink);
app.use('/api', aplayer);
app.use('/api', project);
app.use('/api', cover);
app.use('/api', motto);
app.use('/api', announcement);
app.use('/api', liveTour);
app.use('/api', featuredRecord);
app.use('/api', yanceyMusic);
app.use('/api', workExperience);
app.use('/api', programExperience);
app.use('/api', about);
app.use('/api', uploader);
app.use('/api', user);
app.use('/api', bandwagon);
app.use('/api', userInfo);
app.use('/api', globalStatus);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.listen(3010, () => {
  console.log('listening on port 3010')
});

module.exports = app;
