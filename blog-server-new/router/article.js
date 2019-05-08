import express from 'express';
import {Article, Category} from '../models/index';
import config from '../config/config';
import {deepFlatten, deduplicateArray} from '../tools/tools';
import {responseClient} from '../tools/constant';

const router = express.Router();

// simple pagination (BE)
router.get('/articles/list', async (req, res, next) => {
  try {
    let page = req.query.page
    let searchOption = {}
    if (req.query.status !== '0') {
      req.query.status === '1' ? searchOption.status = true : searchOption.status = false
    }
    const result = await Article.find(searchOption)
      .skip((page - 1) * 10)
      .limit(10)
      .sort({'_id': -1})
    const count = await Article.countDocuments();
    let _data = {
      Amount: count,
      list: result 
    }
    responseClient(res, 200, 0, '返回成功', _data)
  } catch (e) {
    responseClient(res, 200, -1, '', e.message)
    return next(e)
  }
});

// insert an article
router.post('/articles/add', (req, res, next) => {
  try {
    Article.create(req.body, (err, blog) => {
      err ? responseClient(res, 200, -1, '添加文章失败', err) : responseClient(res, 200, 0, '添加文章成功', blog);
    })
  } catch (e) {
    responseClient(res, 200, -1, '添加文章失败', e);
  }
});

// modify an article
router.post('/articles/modify', (req, res) => {
  try {
    Article.findByIdAndUpdate(req.body.id,
      {
        $set: {
          header_cover: req.body.header_cover,
          title: req.body.title,
          summary: req.body.summary,
          contentHtml: req.body.contentHtml,
          contentMarkdown: req.body.contentMarkdown,
          tags: req.body.tags,
          status: req.body.status,
        }
      }, (err) => {
        if (err) {
          responseClient(res, 200, -1, '', e || '编辑失败')
        } else {
          responseClient(res, 200, 0, '', '编辑成功')
        }
      });
  } catch (e) {
    responseClient(res, 200, -1, '', e || '编辑失败')
  }
});

// delete an article
router.post('/articles/delete', (req, res) => {
  try {
    console.log('delete====req.body', req)
    let id = req.body.id
    Article.findByIdAndDelete(id, (err) => {
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

// // get all articles
// router.get('/articles', async (req, res, next) => {
//   try {
//     res.header({
//       status: true,
//       time: new Date().getTime(),
//     });
//     return res.json(await Article.find({}).sort({_id: -1}));
//   } catch (e) {
//     return res.json(e.errors);
//   }
// });

// // search articles by title
// router.get('/articlesByTitle', async (req, res, next) => {
//   try {
//     const result = await Article.find({status: {$ne: false}, title: {$regex: req.query.q}}).sort({_id: -1});
//     res.header({
//       status: true,
//       time: new Date().getTime(),
//       Amount: result.length,
//     });
//     return res.status(200).json(result);
//   } catch (e) {
//     return res.json(e.errors);
//   }
// });

// // search articles by date range
// router.get('/articlesByDateRange', async (req, res, next) => {
//   try {
//     const result = await Article.find({
//       publish_date: {
//         '$gte': req.query.start,
//         '$lte': req.query.end,
//       }
//     }).sort({_id: -1});
//     res.header({
//       status: true,
//       time: new Date().getTime(),
//       Amount: result.length,
//     });
//     return res.status(200).json(result);
//   } catch (e) {
//     return res.json(e.errors);
//   }
// });

// get all category
router.get('/category/list', async (req, res, next) => {
  try {
    const result = await Category.find({});
    responseClient(res, 200, 0, '成功', result)
  } catch (e) {
    console.log(e)
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
// // get articles by tags
// router.get('/articlesByTag', async (req, res, next) => {
//   try {
//     const result = await Article.find({status: {$ne: false}, tags: req.query.tag}).sort({_id: -1});
//     res.header({
//       status: true,
//       time: new Date().getTime(),
//     });
//     return res.json(result);
//   } catch (e) {
//     return res.json(e.errors);
//   }
// });

// // get top 7 pv articles
// router.get('/articlesByPV', async (req, res, next) => {
//   try {
//     res.header({
//       status: true,
//       time: new Date().getTime(),
//     });
//     return res.json(await Article.find({status: {$ne: false}}).sort({pv_count: -1, _id: -1}).limit(7));
//   } catch (e) {
//     return res.json(e.errors);
//   }
// });

// // count article numbers by day
// router.get('/articlesByDay', async (req, res, next) => {
//   try {
//     res.header({
//       status: true,
//       time: new Date().getTime(),
//     });
//     const result = await Article.aggregate([
//         {
//           $project: {
//             day: {$substr: [{$add: '$publish_date'}, 0, 10]}
//           }
//         },
//         {
//           $group: {
//             _id: '$day',
//             count: {$sum: 1}
//           }
//         },
//         {
//           $sort: {
//             _id: 1
//           }
//         }
//       ]
//     );
//     return res.json(result);
//   } catch (e) {
//     return res.json(e.errors);
//   }
// });

// // get an article by _id
// router.get('/articles/:id', async (req, res, next) => {
//   try {
//     const result = await Article.find({_id: req.params.id});
//     const nextArticle = await Article.find({
//       '_id': {"$gt": req.params.id},
//       status: {$ne: false}
//     }).limit(1).sort({_id: 1});
//     const previousArticle = await Article.find({
//       '_id': {"$lt": req.params.id},
//       status: {$ne: false}
//     }).limit(1).sort({_id: -1});
//     res.header({
//       Status: true,
//       Time: new Date().getTime(),
//       Version: config.version,
//     });
//     if (nextArticle.length === 0) {
//       return res.json({
//         curArticle: result[0],
//         nextArticle: {},
//         previousArticle: {
//           id: previousArticle[0]._id,
//           header_cover: previousArticle[0].header_cover,
//           title: previousArticle[0].title,
//         },
//       });
//     } else if (previousArticle.length === 0) {
//       return res.json({
//         curArticle: result[0],
//         nextArticle: {
//           id: nextArticle[0]._id,
//           header_cover: nextArticle[0].header_cover,
//           title: nextArticle[0].title,
//         },
//         previousArticle: {},
//       });
//     } else if (nextArticle.length === 0 && previousArticle.length === 0) {
//       return res.json({
//         curArticle: result[0],
//         nextArticle: {},
//         previousArticle: {},
//       });
//     } else {
//       return res.json({
//         curArticle: result[0],
//         nextArticle: {
//           id: nextArticle[0]._id,
//           header_cover: nextArticle[0].header_cover,
//           title: nextArticle[0].title,
//         },
//         previousArticle: {
//           id: previousArticle[0]._id,
//           header_cover: previousArticle[0].header_cover,
//           title: previousArticle[0].title,
//         },
//       });
//     }
//   } catch (e) {
//     return res.status(404).json(e.message);
//   }
// });


// // FE
// router.get('/articleList/page/:page', async (req, res, next) => {
//   try {
//     const result = await Article.find({status: {$ne: false}})
//       .skip((req.params.page - 1) * 10)
//       .limit(10)
//       .sort({'_id': -1});
//     const count = await Article.countDocuments();
//     if (result.length === 0) {
//       return res.status(404).json(
//         {
//           error: 'no articles!',
//           status: 404
//         }
//       );
//     } else {
//       return res.header({
//         Status: true,
//         Time: new Date().getTime(),
//         Version: config.version,
//         Amount: count,
//       }).status(200).json(result);
//     }
//   } catch (e) {
//     return next(e);
//   }
// });

// router.get('/archives', async (req, res, next) => {
//   try {
//     const result = await Article.aggregate([
//         {
//           $group: {
//             _id: {
//               year: {$year: "$publish_date"},
//               month: {$month: "$publish_date"},
//               day: {$dayOfMonth: "$publish_date"},
//               title: '$title',
//               id: '$_id',
//               pv_count: '$pv_count',
//             },
//           }
//         },
//         {
//           $sort: {_id: -1}
//         },
//         {
//           $group: {
//             _id: {year: "$_id.year", month: "$_id.month"},
//             data: {
//               $push:
//                 {
//                   day: "$_id.day",
//                   title: '$_id.title',
//                   id: '$_id.id',
//                   pv_count: '$_id.pv_count',
//                 }
//             }
//           }
//         },
//         {
//           $group: {
//             _id: {year: "$_id.year"},
//             data: {$push: {month: "$_id.month", data: "$data"}}
//           }
//         },
//       ]
//     );
//     return res.json(result)
//   } catch (e) {
//     return next(e)
//   }
// });

// // get like
// router.get('/likes/:id', async (req, res, next) => {
//   try {
//     const result = await Article.find({_id: req.params.id, like_count: {$in: [req.query.ip]}},
//     );
//     if (result.length !== 0) {
//       return res.status(200).json({
//         liked: true,
//       });
//     } else {
//       return res.status(200).json({
//         liked: false,
//       });
//     }
//   } catch (e) {
//     return next(e)
//   }
// });

// // increase like
// router.put('/likes/:id', async (req, res) => {
//   try {
//     const result = await Article.findOneAndUpdate({
//         _id: req.params.id
//       },
//       {
//         $addToSet: {
//           like_count: req.query.ip,
//         }
//       }, {
//         new: true,
//       });
//     return res.status(201).json({
//       like_number: result.like_count.length,
//     });
//   } catch (e) {
//     return res.json(e.message);
//   }
// });


// router.put('/articleStatus/:id', async (req, res) => {
//   try {
//     const result = await Article.findOneAndUpdate({
//         _id: req.params.id
//       },
//       {
//         $set: {
//           status: req.body.status,
//         }
//       }, {
//         new: true,
//       });
//     return res.status(201).send(result);
//   } catch (e) {
//     return res.json(e.message);
//   }
// });

// // increase pv
// router.put('/articlePV/:id', async (req, res) => {
//   try {
//     const result = await Article.update(
//       {
//         _id: req.params.id
//       },
//       {
//         $inc: {pv_count: 1}
//       }
//     );
//     return res.status(201).send(result);
//   } catch (e) {
//     return res.json(e.message);
//   }
// });

// // delete an article
// router.delete('/articles/:id', async (req, res) => {
//   try {
//     const result = await Article.findOneAndRemove({
//       _id: req.params.id
//     });
//     if (!result) {
//       return res.status(404).send('404 Not Found');
//     } else {
//       res.status(204).send(`${result} has been successfully deleted`);
//     }
//   } catch (e) {
//     return res.status(500).send('Unknown Server Error');
//   }
// });

// router.post('/batchArticles', async (req, res) => {
//   try {
//     const result = await Article.remove({_id: {$in: req.body.selectedList}});
//     if (result.n === 0) {
//       return res.status(404).send('404 Not Found');
//     } else {
//       res.status(200).send(result);
//     }
//   } catch (e) {
//     return res.status(500).send('Unknown Server Error');
//   }
// });

module.exports = router;
