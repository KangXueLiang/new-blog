'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// 获取motto列表
router.get('/mottoes', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Motto.find({}).sort({ _id: -1 });
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 获取最近的motto。用于客户端展示
router.get('/latestMotto', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Motto.find({}).limit(1).sort({ _id: -1 });
    (0, _constant.responseClient)(res, 200, 0, '成功', result[0]);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 新增motto
router.post('/mottoes', (req, res, next) => {
  try {
    _index.Motto.create(req.body, (err, motto) => {
      if (err) {
        (0, _constant.responseClient)(res, 200, -1, '失败', err);
      } else {
        (0, _constant.responseClient)(res, 200, 0, '成功', motto);
      }
    });
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 编辑motto
router.put('/mottoes/:id', async (req, res) => {
  try {
    const result = await _index.Motto.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        content: req.body.content
      }
    }, {
      new: true
    });
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 删除motto
router.delete('/mottoes/:id', async (req, res) => {
  try {
    const result = await _index.Motto.findOneAndRemove({
      _id: req.params.id
    });
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 批量删除
router.post('/batchMottoes', async (req, res) => {
  try {
    const result = await _index.Motto.remove({ _id: { $in: req.body.selectedList } });
    if (result.n === 0) {
      (0, _constant.responseClient)(res, 404, -1, '404 Not Found');
    } else {
      (0, _constant.responseClient)(res, 200, 0, '成功', result);
    }
  } catch (e) {
    (0, _constant.responseClient)(res, 500, -1, 'Unknown Server Error', e);
  }
});

module.exports = router;