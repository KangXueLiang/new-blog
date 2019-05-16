const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const OSS = require('ali-oss');
import {ALI_OSS_ACCESS_KEY_ID, ALI_OSS_ACCESS_KEY_SECRET, ALI_OSS_BUCKET, ALI_OSS_REGION, responseClient} from '../tools/constant';

const client = new OSS({
  region: ALI_OSS_REGION,
  accessKeyId: ALI_OSS_ACCESS_KEY_ID,
  accessKeySecret: ALI_OSS_ACCESS_KEY_SECRET,
  bucket: ALI_OSS_BUCKET
});

router.post('/upload', (req, res, next) => {

  const form = new formidable.IncomingForm();
  // form.uploadDir = './public/images_backup';
  form.keepExtensions = true; // 设置上传后文件是否使用原扩展名，默认值为false。如果希望保存到form.uploadDir中的文件使用原扩展名时，需要将此项设置为true
  form.maxFieldsSize = 15 * 1024 * 1024; // 设置文件上传的大小
  form.maxFileSize = 15 * 1024 * 1024; // Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 200MB.
  form.multiples = true; // If this option is enabled, when you call form.parse, the files argument will contain arrays of files for inputs which submit multiple files using the HTML5 multiple attribute.
  form.hash = 'md5'; // 是否对上传文件进行hash较验，可设置为'sha1' 或 'md5'
  form.parse(req, async (error, fields, files) => {
    if (error) {
      throw error;
    }
    client.useBucket('logan-blog');
    try {
      if (files.avatar) {
        const result = await client.put(files.avatar.name, files.avatar.path);
        let tmp = {
          name: result.name,
          url: result.url.slice(5)
        }
        responseClient(res, 200, 0, '上传成功', tmp)
      } else {
        const result = await client.put(files.file.name, files.file.path);
        let tmp = {
          name: result.name,
          url: result.url.slice(5)
        }
        responseClient(res, 200, 0, '上传成功', tmp)
      }
    } catch (err) {
      responseClient(res, 200, -1, '上传失败', err)
      return err
    }
  });
});

module.exports = router;
