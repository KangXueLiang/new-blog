'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// 获取个人信息
router.get('/userInfo', (req, res, next) => {
  try {
    _index.UserInfo.findOne({}, (err, result) => {
      if (err) {
        (0, _constant.responseClient)(res, 200, -1, '失败', []);
      } else {
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
      }
    });
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', []);
  }
});

// 创建/更新个人信息

router.post('/userInfo', (req, res, next) => {
  try {
    _index.UserInfo.count({}, (err, count) => {
      if (err) {
        (0, _constant.responseClient)(res, 200, -1, '修改个人信息失败');
      } else {
        if (count === 0) {
          _index.UserInfo.create(req.body, (err, UserInfo) => {
            if (err) {
              (0, _constant.responseClient)(res, 200, -1, '创建个人信息失败');
            } else {
              (0, _constant.responseClient)(res, 200, 0, '创建个人信息成功', UserInfo);
            }
          });
        } else {
          _index.UserInfo.findOneAndUpdate({
            _id: req.body._id
          }, {
            $set: {
              user_name: req.body.user_name,
              position: req.body.position,
              self_introduction: req.body.self_introduction,
              city: req.body.city,
              avatar: req.body.avatar
            }
          }, {
            new: true
          }, (err, result) => {
            if (err) {
              (0, _constant.responseClient)(res, 200, -1, '修改个人信息失败');
            } else {
              (0, _constant.responseClient)(res, 200, 0, '修改个人信息成功', result);
            }
          });
        }
      }
    });
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '修改个人信息失败');
  }
});

module.exports = router;