'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../models/index');

var _constant = require('../tools/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// router.get('/players', async (req, res, next) => {
//     try {
//         res.header({
//             status: true,
//             time: new Date().getTime(),
//         });
//         const result = await Player.find({}).sort({_id: -1});
//         return res.status(200).json(result);
//     } catch (e) {
//         return next(e)
//     }
// });

router.get('/litePlayers', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime()
        });
        const result = await _index.Player.find({ show: { $ne: false } }).sort({ order: 1 });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        return next(e);
    }
});

router.post('/players', async (req, res, next) => {
    try {
        if (req.body._id) {
            await _index.Player.findOneAndUpdate({
                _id: req.body._id
            }, {
                $set: {
                    title: req.body.title,
                    artist: req.body.artist,
                    cover: req.body.cover,
                    music_file_url: req.body.music_file_url,
                    lrc: req.body.lrc,
                    order: req.body.order
                }
            }, {
                new: true
            });
        } else {
            await _index.Player.create(req.body);
        }
        const result = await _index.Player.find({}).sort({ order: 1 });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
    }
});

router.delete('/players/:id', async (req, res) => {
    try {
        await _index.Player.findOneAndRemove({
            _id: req.params.id
        });
        const result = await _index.Player.find({}).sort({ order: 1 });
        (0, _constant.responseClient)(res, 200, 0, '成功', result);
    } catch (e) {
        (0, _constant.responseClient)(res, 200, -1, '失败', e.message);
    }
});

module.exports = router;