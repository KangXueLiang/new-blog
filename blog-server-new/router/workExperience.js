import express from 'express';
import {responseClient} from '../tools/constant'
import { WorkExperience } from '../models/index';

const router = express.Router();

router.get('/workExperience', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime(),
        });
        const result = await WorkExperience.find({}).sort({_id: -1});
        responseClient(res, 200, 0, '成功', result)
    } catch (e) {
        return next(e)
    }
});


router.post('/workExperience', async (req, res, next) => {
    try {
        if (req.body._id) {
            await WorkExperience.findOneAndUpdate({
                _id: req.body._id
            },
            {
                $set: {
                    enterprise_name: req.body.enterprise_name,
                    position: req.body.position,
                    in_service: req.body.in_service,
                    work_content: req.body.work_content,
                    work_technology_stack: req.body.work_technology_stack,
                }
            }, {
                new: true,
            });
        } else {
            await WorkExperience.create(req.body)
        }
        const result  = await WorkExperience.find({}).sort({_id: -1})
        responseClient(res, 200, 0, '成功', result)
    } catch (e) {
        responseClient(res, 200, -1, '失败', e.message);
    }
});

router.delete('/workExperience/:id', async (req, res) => {
    try {
        const result = await WorkExperience.findOneAndRemove({
            _id: req.params.id
        });
        responseClient(res, 200, -1, '成功', result);
    } catch (e) {
        responseClient(res, 200, -1, '失败', e.message);
    }
});


module.exports = router;

