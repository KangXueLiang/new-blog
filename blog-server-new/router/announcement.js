import express from 'express';
import { Announcement } from '../models/index';
import {responseClient} from '../tools/constant';

const router = express.Router();

// 获取Announcement列表
router.get('/announcements', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime(),
    });
    const result = await Announcement.find({}).sort({_id: -1});
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 获取最近的Announcement。用于客户端展示
router.get('/latestAnnouncements', async (req, res, next) => {
  try {
    res.header({
      status: true,
      time: new Date().getTime(),
    });
    const result = await Announcement.find({}).limit(1).sort({_id: -1});
    responseClient(res, 200, 0, '成功', result[0])
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 新增Announcement
router.post('/announcements', (req, res, next) => {
  try {
    Announcement.create(req.body, (err, announcement) => {
      if (err) {
        responseClient(res, 200, -1, '失败', err)
      } else {
        responseClient(res, 200, 0, '成功', announcement)
      }
    })
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 编辑announcement
router.put('/announcements/:id', async (req, res) => {
  try {
    const result = await Announcement.findOneAndUpdate({
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

// 删除Announcement
router.delete('/announcements/:id', async (req, res) => {
  try {
    const result = await Announcement.findOneAndRemove({
      _id: req.params.id
    });
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e)
  }
});

// 批量删除
router.post('/batchAnnouncements', async (req, res) => {
  try {
    const result = await Announcement.remove({_id: {$in: req.body.selectedList}});
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
