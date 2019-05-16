import express from 'express';
import { Motto } from '../models/index';
import {responseClient} from '../tools/constant';

const router = express.Router();

// 获取motto列表
router.get('/mottoes', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime(),
    });
    const result = await Motto.find({}).sort({_id: -1});
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 获取最近的motto。用于客户端展示
router.get('/latestMotto', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime(),
    });
    const result = await Motto.find({}).limit(1).sort({_id: -1});
    responseClient(res, 200, 0, '成功', result[0])
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 新增motto
router.post('/mottoes', (req, res, next) => {
  try {
    Motto.create(req.body, (err, motto) => {
      if (err) {
        responseClient(res, 200, -1, '失败', err)
      } else {
        responseClient(res, 200, 0, '成功', motto)
      }
    })
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 编辑motto
router.put('/mottoes/:id', async (req, res) => {
  try {
    const result = await Motto.findOneAndUpdate({
        _id: req.params.id
      },
      {
        $set: {
          content: req.body.content,
        }
      }, {
        new: true,
      });
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 删除motto
router.delete('/mottoes/:id', async (req, res) => {
  try {
    const result = await Motto.findOneAndRemove({
      _id: req.params.id
    });
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 批量删除
router.post('/batchMottoes', async (req, res) => {
  try {
    const result = await Motto.remove({_id: {$in: req.body.selectedList}});
    if (result.n === 0) {
      responseClient(res, 404, -1, '404 Not Found')
    } else {
      responseClient(res, 200, 0, '成功', result)
    }
  } catch (e) {
    responseClient(res, 500, -1, 'Unknown Server Error', e)
  }
});

module.exports = router;
