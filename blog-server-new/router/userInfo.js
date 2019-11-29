import express from 'express'
import { UserInfo } from '../models/index'
import {responseClient} from '../tools/constant'

const router = express.Router()

// 获取个人信息
router.get('/userInfo',  (req, res, next) => {
  try {
    UserInfo.findOne({}, (err, result) => {
      if (err) {
        responseClient(res, 200, -1, '失败', [])
      } else {
        responseClient(res, 200, 0, '成功', result)
      }
    })
  } catch (e) {
    responseClient(res, 200, -1, '失败', [])
  }
});


// 创建/更新个人信息

router.post('/userInfo', (req, res, next) => {
  try {
    UserInfo.count({}, (err, count) => {
      if (err) {
        responseClient(res, 200, -1, '修改个人信息失败')
      } else {
        if (count === 0) {
          UserInfo.create(req.body, (err, UserInfo) => {
            if(err){
              responseClient(res, 200, -1, '创建个人信息失败')
            }else {
              responseClient(res, 200, 0, '创建个人信息成功', UserInfo)
            }
          })
        } else {
          UserInfo.findOneAndUpdate({
            _id: req.body._id
          },
          {
            $set: {
                user_name: req.body.user_name,
                position: req.body.position,
                self_introduction: req.body.self_introduction,
                city: req.body.city,
                avatar: req.body.avatar,
            }
          }, {
            new: true,
          }, (err, result) => {
            if(err){
              responseClient(res, 200, -1, '修改个人信息失败')
            }else {
              responseClient(res, 200, 0, '修改个人信息成功', result)
            }
          });     
        }
      }
    })
  } catch (e) {
    responseClient(res, 200, -1, '修改个人信息失败')
  }
})

module.exports = router

