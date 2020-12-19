import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

const s3Bucket = new AWS.S3({ params: { Bucket: process.env.AWS_BUCKET_NAME } });

interface IResponse {
  statusCode: number;
  message: string;
}

const sendToBucket = (base64: string, filename: string) => {
  const res = {} as IResponse;
  const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const data = {
    ACL: 'public-read',
    Key: filename,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  } as PutObjectRequest;

  s3Bucket.putObject(data, function (err, data) {
    if (err) {
      console.log(err);

      res.statusCode = 401;
      res.message = 'Falha ao enviar os arquivos';
    } else {
      res.statusCode = 200;
      res.message = 'Sucesso';
    }
  });

  if (!res.statusCode) {
    res.statusCode = 500;
    res.message = 'Erro interno no servidor';
  }

  return res;
};

export default {
  sendToBucket
};
