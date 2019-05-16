import express from 'express';
import {FriendLink} from '../models/index';
import config from '../config/config';
import {responseClient} from '../tools/constant';

const router = express.Router();

// get all friendLink
router.get('/friendLink/list', async (req, res, next) => {
  try {
    const result = await FriendLink.find({});
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', [])
  }
});

// add or edit friendLink
router.post('/friendLink/edit', async (req, res, next) => {
  let id = req.body.id
  let result = await FriendLink.findById(id)
  if (result) {
    FriendLink.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
        link: req.body.link,
        description: req.body.description
      }
    }, (err) => {
      if (err) {
        responseClient(res, 200, -1, '', '编辑失败')
      } else {
        responseClient(res, 200, 0, '', '编辑成功')
      }
    })
  } else {
    FriendLink.create(req.body, (err, friendLink) => {
      err ? responseClient(res, 200, -1, '添加友链失败', err) : responseClient(res, 200, 0, '添加友链成功', friendLink);
    })
  }
})

// delete friendLink
router.post('/friendLink/delete', (req, res, next) => {
  try {
    let id = req.body.id
    FriendLink.findByIdAndDelete(id, (err) => {
      if (err) {
        responseClient(res, 200, -1, '', '删除失败')
      } else {
        responseClient(res, 200, 0, '', '删除成功')
      }
    })
  } catch (e) {
    responseClient(res, 200, -1, '', e.message)
    return next(e)
  }
})

module.exports = router;