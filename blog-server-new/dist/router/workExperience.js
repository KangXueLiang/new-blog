'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _constant = require('../tools/constant');

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/workExperience', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime()
        });
        const result = await _index.WorkExperience.find({}).sort({ _id: -1 });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        return next(e);
    }
});

router.post('/workExperience', async (req, res, next) => {
    try {
        if (req.body._id) {
            await _index.WorkExperience.findOneAndUpdate({
                _id: req.body._id
            }, {
                $set: {
                    enterprise_name: req.body.enterprise_name,
                    position: req.body.position,
                    in_service: req.body.in_service,
                    work_content: req.body.work_content,
                    work_technology_stack: req.body.work_technology_stack
                }
            }, {
                new: true
            });
        } else {
            await _index.WorkExperience.create(req.body);
        }
        const result = await _index.WorkExperience.find({}).sort({ _id: -1 });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
    }
});

router.delete('/workExperience/:id', async (req, res) => {
    try {
        const result = await _index.WorkExperience.findOneAndRemove({
            _id: req.params.id
        });
        (0, _constant.responseClient)(res, 200, -1, '成功', result);
    } catch (e) {
        (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
    }
});

module.exports = router;