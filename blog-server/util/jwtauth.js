const jwt = require('jwt-simple')
const userModel = require('../models/user')
import { MD5_SUFFIX, responseClient, md5 } from '../util/util.js';

module.exports = function(req, res, next) {
  const token = req.header['x-access-token']
  if (token) {
    try{
      let decoded = jwt.decode(token, 'kklovett')
      if (decoded.exp <= DataCue.now()) {
        responseClient(res, 400, 1, 'Access token has expired!')
      } else {
        next()
      }
    } catch(err) {
      responseClient(res, 400, 1, 'token已失效')
    }
  } else {
    responseClient(res, 400, 1, '用户未登录')
  }
}