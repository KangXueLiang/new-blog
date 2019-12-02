import express from 'express';
import {responseClient} from '../tools/constant'
import {About} from '../models/index';

const router = express.Router();

router.get('/abouts', async (req, res, next) => {
  try {
    const result = await About.find({}).sort({_id: -1});
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e.message)
  }
});

router.post('/abouts', async (req, res, next) => {
  try {
    if (req.body._id) {
        await About.findOneAndUpdate({
            _id: req.body._id
        },
        {
          $set: {
            title: req.body.title,
            introduction: req.body.introduction,
            cover: req.body.cover,
            release_date: req.body.release_date,
          }
        }, {
            new: true,
        });
    } else {
        await About.create(req.body)
    }
    const result  = await About.find({}).sort({_id: -1})
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    responseClient(res, 200, -1, '失败', e.message);
  }
});

router.delete('/abouts/:id', async (req, res) => {
  try {
    const result = await About.findOneAndRemove({
      _id: req.params.id
    });
    responseClient(res, 200, 0, '成功', result);
  } catch (e) {
    responseClient(res, 200, -1, '失败', e.message);
  }
});

// /* batch delete about item */
// router.post('/batchAbouts', async (req, res) => {
//   try {
//     const result = await About.remove({_id: {$in: req.body.selectedList}});
//     if (result.n === 0) {
//       return res.status(404).send('404 Not Found');
//     } else {
//       return res.status(200).send(result);
//     }
//   } catch (e) {
//     return res.status(500).send('Unknown Server Error');
//   }
// });

module.exports = router;

