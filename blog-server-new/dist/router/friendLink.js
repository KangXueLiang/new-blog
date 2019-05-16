'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// get all friendLink
router.get('/friendLink/list', async (req, res, next) => {
  try {
    const result = await _index.FriendLink.find({});
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', []);
  }
});

// add or edit friendLink
router.post('/friendLink/edit', async (req, res, next) => {
  let id = req.body.id;
  let result = await _index.FriendLink.findById(id);
  if (result) {
    _index.FriendLink.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
        link: req.body.link,
        description: req.body.description
      }
    }, err => {
      if (err) {
        (0, _constant.responseClient)(res, 200, -1, '', '编辑失败');
      } else {
        (0, _constant.responseClient)(res, 200, 0, '', '编辑成功');
      }
    });
  } else {
    _index.FriendLink.create(req.body, (err, friendLink) => {
      err ? (0, _constant.responseClient)(res, 200, -1, '添加友链失败', err) : (0, _constant.responseClient)(res, 200, 0, '添加友链成功', friendLink);
    });
  }
});

// delete friendLink
router.post('/friendLink/delete', (req, res, next) => {
  try {
    let id = req.body.id;
    _index.FriendLink.findByIdAndDelete(id, err => {
      if (err) {
        (0, _constant.responseClient)(res, 200, -1, '', '删除失败');
      } else {
        (0, _constant.responseClient)(res, 200, 0, '', '删除成功');
      }
    });
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '', e.message);
    return next(e);
  }
});

module.exports = router;