import express from 'express';
import { Cover } from '../models/index';
import {responseClient} from '../tools/constant';

const router = express.Router();

router.get('/covers', async(req, res, next) => {
  try {
    const result = await Cover.find({})
    responseClient(res, 200, 0, '成功', result)
  } catch(e) {
    responseClient(res, 200, -1, '失败', e.message)
  }
})

router.post('/covers', async(req, res, next) => {
  try {
    if (req.body._id) {
        await Cover.findOneAndUpdate({
            _id: req.body._id
        },
        {
            $set: {
                url: req.body.url,
                name: req.body.name
            }
        }, {
            new: true,
        });
    } else {
        await Cover.create(req.body)
    }
    const result  = await Cover.find({}).sort({order: 1})
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e.message)
  }
})

router.delete('/covers/:id', async(req, res, next) => {
  try {
    await Cover.findOneAndRemove({
        _id: req.params.id
    });
    const result  = await Cover.find({}).sort({order: 1})
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e.message)
  }
})


module.exports = router;
