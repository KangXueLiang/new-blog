import express from 'express';
import { ProgramExperience } from '../models/index';
import {responseClient} from '../tools/constant'

const router = express.Router();

router.get('/programExperience', async (req, res, next) => {
    try {
        res.header({
            status: true,
            time: new Date().getTime(),
        });
        const result = await ProgramExperience.find({}).sort({_id: -1});
        responseClient(res, 200, 0, '成功', result)
    } catch (e) {
        return next(e)
    }
});


router.post('/programExperience', async (req, res, next) => {
    try {
        if (req.body._id) {
            await ProgramExperience.findOneAndUpdate({
                _id: req.body._id
            },
            {
                $set: {
                    program_name: req.body.program_name,
                    program_url: req.body.program_url,
                    program_content: req.body.program_content,
                    program_technology_stack: req.body.program_technology_stack
                }
            }, {
                new: true,
            });
        } else {
            await ProgramExperience.create(req.body)
        }
        const result  = await ProgramExperience.find({}).sort({_id: -1})
        responseClient(res, 200, 0, '成功', result);
    } catch (e) {
        responseClient(res, 200, -1, '失败', e.message);
    }
});

router.delete('/programExperience/:id', async (req, res) => {
    try {
        const result = await ProgramExperience.findOneAndRemove({
            _id: req.params.id
        });
        responseClient(res, 200, 0, '成功', result);
    } catch (e) {
        responseClient(res, 200, -1, '失败', e.message);
    }
});


module.exports = router;

