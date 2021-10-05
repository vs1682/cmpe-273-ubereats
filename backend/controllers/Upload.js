import AWS from 'aws-sdk';
import uuid from 'uuid';

const { v4: uuidv4} = uuid;

const UploadController = {};

// AWS.config.update({ credentials, region: 'us-west-1' });

const s3 = new AWS.S3({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4'
});

UploadController.toS3 = async (req, res)  => {
  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Key: uuidv4(),
    Expires: 60,
    Bucket: 's3-bucket-cmpe-273-ubereats',
  });

  res.send({
    signedUrl
  });
}

export default UploadController;