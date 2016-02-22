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

router.post('/', function(req, res) {
  var uploadToS3 = function(stream) {
    if (req.query.increment) {
      counter.increment(req);
    }

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
        s3.getSignedUrl('getObject', {
          Bucket: 'cosmicsurgery',
          Key: key,
          ResponseContentDisposition: 'attachment; filename=cosmicsurgery.jpg',
        }, function (err, url) {
          if (err) {
            console.log('failed to upload', err);
            res.status(500).json({
              error: true,
              message: 'failed to upload image'
            });
          } else {
            res.json({
              id: id,
              url: url
            });
          }
        });

      }
    });
  };

  gm(req.file.buffer, req.file.filename)
  .autoOrient()
  .resize(720, 720, '^')
  .gravity('Center')
  .extent(720, 720)
  .toBuffer('jpg', function (err, buffer) {
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
