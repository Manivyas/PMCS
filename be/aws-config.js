const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: '/',
  secretAccessKey: '/',
  region: 'ap-south-1',
});

module.exports = AWS;
