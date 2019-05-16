'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// 获取Announcement列表
router.get('/announcements', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Announcement.find({}).sort({ _id: -1 });
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 获取最近的Announcement。用于客户端展示
router.get('/latestAnnouncements', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime()
    });
    const result = await _index.Announcement.find({}).limit(1).sort({ _id: -1 });
    (0, _constant.responseClient)(res, 200, 0, '成功', result[0]);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 新增Announcement
router.post('/announcements', (req, res, next) => {
  try {
    _index.Announcement.create(req.body, (err, announcement) => {
      if (err) {
        (0, _constant.responseClient)(res, 200, -1, '失败', err);
      } else {
        (0, _constant.responseClient)(res, 200, 0, '成功', announcement);
      }
    });
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 编辑announcement
router.put('/announcements/:id', async (req, res) => {
  try {
    const result = await _index.Announcement.findOneAndUpdate({
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

// 删除Announcement
router.delete('/announcements/:id', async (req, res) => {
  try {
    const result = await _index.Announcement.findOneAndRemove({
      _id: req.params.id
    });
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e);
  }
});

// 批量删除
router.post('/batchAnnouncements', async (req, res) => {
  try {
    const result = await _index.Announcement.remove({ _id: { $in: req.body.selectedList } });
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