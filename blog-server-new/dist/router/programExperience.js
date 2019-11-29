'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/programExperience', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime()
        });
        const result = await _index.ProgramExperience.find({}).sort({ _id: -1 });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        return next(e);
    }
});

router.post('/programExperience', async (req, res, next) => {
    try {
        if (req.body._id) {
            await _index.ProgramExperience.findOneAndUpdate({
                _id: req.body._id
            }, {
                $set: {
                    program_name: req.body.program_name,
                    program_url: req.body.program_url,
                    program_content: req.body.program_content,
                    program_technology_stack: req.body.program_technology_stack
                }
            }, {
                new: true
            });
        } else {
            await _index.ProgramExperience.create(req.body);
        }
        const result = await _index.ProgramExperience.find({}).sort({ _id: -1 });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
    }
});

router.delete('/programExperience/:id', async (req, res) => {
    try {
        const result = await _index.ProgramExperience.findOneAndRemove({
            _id: req.params.id
        });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
    }
});

module.exports = router;