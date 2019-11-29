import express from 'express';
import {Category} from '../models/index';
import config from '../config/config';
import {responseClient} from '../tools/constant';

const router = express.Router();

// BE
// get all category
router.get('/category/list', async (req, res, next) => {
  try {
    const result = await Category.find({});
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', [])
  }
});

// add or edit category
router.post('/category/edit', async (req, res, next) => {
  let id = req.body.id
  let category = await Category.findById(id)
  if (category) {
    Category.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
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
    Category.create(req.body, (err, category) => {
      err ? responseClient(res, 200, -1, '添加分类失败', err) : responseClient(res, 200, 0, '添加分类成功', category);
    })
  }
})

// delete categroy
router.post('/category/delete', (req, res, next) => {
  try {
    let id = req.body.id
    Category.findByIdAndDelete(id, (err) => {
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

// FE
router.get('/categoryList', async (req, res, next) => {
  try {
    const result = await Category.find({});
    responseClient(res, 200, 0, '成功', result.map(item => {
      return item.name
    }))
  } catch (e) {
    responseClient(res, 200, -1, '失败', [])
  }
});

module.exports = router;