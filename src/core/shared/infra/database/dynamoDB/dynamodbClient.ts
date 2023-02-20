import AWS, { DynamoDB } from 'aws-sdk'
import { EnvHelper } from 'shared/utils/envHelper'

AWS.config.update({
  accessKeyId: EnvHelper.accessKeyId,
  secretAccessKey: EnvHelper.secretAccessKeyId,
  region: EnvHelper.region
  // region: 'sa-east-1'
})

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

const isOffline = () => {
  return process.env.NODE_ENV === 'test'
}

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new AWS.DynamoDB.DocumentClient()
