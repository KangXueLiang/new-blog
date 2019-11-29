const crypto = require('crypto');

module.exports = {
  MD5_SUFFIX: 'Logan',
  MD5: (pwd) => {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
  },
  SECRET_KEY: 'kklobett',

  // 响应客户端
	responseClient(res, httpCode = 500, code = 3, message = '服务端异常', data = {}) {
		let responseData = {};
		responseData.code = code;
		responseData.message = message;
		responseData.data = data;
		res.status(httpCode).json(responseData);
	},

  // 阿里云的图床配置
  ALI_OSS_REGION: 'oss-cn-shenzhen',
  ALI_OSS_ACCESS_KEY_ID: 'LTAIX9I4fykIlfqo',
  ALI_OSS_ACCESS_KEY_SECRET: 'utOgeivwy3R9dP7nYJG8UPs6hcUgUA',
  ALI_OSS_BUCKET: 'logan-blog',
};
