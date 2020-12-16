import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

const s3Bucket = new AWS.S3({ params: { Bucket: process.env.AWS_BUCKET_NAME } });

const sendToBucket = (base64: string, filename: string) => {
  const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const data = {
    Key: filename,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  } as PutObjectRequest;

  s3Bucket.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
    }

    console.log(data);
  });
};

export default {
  sendToBucket
};
