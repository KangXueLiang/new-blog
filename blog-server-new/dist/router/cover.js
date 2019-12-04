'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/covers', async (req, res, next) => {
  try {
    const result = await _index.Cover.find({});
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
  }
});

router.post('/covers', async (req, res, next) => {
  try {
    if (req.body._id) {
      await _index.Cover.findOneAndUpdate({
        _id: req.body._id
      }, {
        $set: {
          url: req.body.url,
          name: req.body.name
        }
      }, {
        new: true
      });
    } else {
      await _index.Cover.create(req.body);
    }
    const result = await _index.Cover.find({}).sort({ order: 1 });
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
  }
});

router.delete('/covers/:id', async (req, res, next) => {
  try {
    await _index.Cover.findOneAndRemove({
      _id: req.params.id
    });
    const result = await _index.Cover.find({}).sort({ order: 1 });
    (0, _constant.responseClient)(res, 200, 0, '成功', result);
  } catch (e) {
    (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
  }
});

module.exports = router;