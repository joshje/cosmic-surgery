var router = require('express').Router();
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var gm = require('gm').subClass({ imageMagick: true });
var counter = require('./helpers/counter');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_COSMIC,
  secretAccessKey: process.env.AWS_SECRET_KEY_COSMIC
});

var s3 = new AWS.S3();

router.get('/', function(req, res) {
  var uploadToS3 = function(stream) {
    counter.increment(req);

    var id = uuid.v4();
    var key = 'images/' + id + '.png';

    s3.putObject({
      Bucket: 'cosmicsurgery',
      Key: key,
      Body: stream,
      ACL: 'public-read'
    }, function (err) {
      if (err) {
        console.log('failed to upload', err);
        res.status(500).json({
          error: true,
          message: 'failed to upload image'
        });
      } else {
        res.json({
          id: id,
          url: 'https://d2csffd0gyvkmk.cloudfront.net/' + key
        });
      }
    });
  };

  gm(req.file.buffer, req.file.filename)
  .autoOrient()
  .resize(1280, 720, '^')
  .gravity('Center')
  .extent(1280, 720)
  .toBuffer('png', function (err, buffer) {
    if (err) {
      console.log('imageMagick error', err);
      res.status(500).json({
        error: true,
        message: 'failed to parse image'
      });
    } else {
      uploadToS3(buffer);
    }
  });
});

module.exports = router;
