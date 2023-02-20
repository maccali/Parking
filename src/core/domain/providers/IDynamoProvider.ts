import { AWSError } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { PromiseResult } from 'aws-sdk/lib/request'

export interface IDynamoProvider {
  query(
    queryParams: DocumentClient.QueryInput
  ): Promise<PromiseResult<DocumentClient.QueryOutput, AWSError>>
  put(
    putItemsParams: DocumentClient.PutItemInput
  ): Promise<PromiseResult<DocumentClient.PutItemOutput, AWSError>>
  delete(
    deleteItemsParams: DocumentClient.DeleteItemInput
  ): Promise<PromiseResult<DocumentClient.DeleteItemOutput, AWSError>>
}
