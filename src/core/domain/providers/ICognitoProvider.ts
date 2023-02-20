import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk'
import { AttributeListType } from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { PromiseResult } from 'aws-sdk/lib/request'

export interface ICognitoProvider {
  signUp(
    username: string,
    password: string
  ): Promise<
    PromiseResult<CognitoIdentityServiceProvider.SignUpResponse, AWSError>
  >
  forceEmailVerified(username: string): Promise<void>
  confirmSignUp(username: string): Promise<void>
  login(email: string, password: string): Promise<unknown>
  forgotPassword(email: string): Promise<unknown>
  updateUserAttributes(
    username,
    userAttributes: AttributeListType
  ): Promise<void>
  resetPassword(
    email: string,
    newPassword: string,
    verificationCode: string
  ): Promise<unknown>
  changePassword(
    email: string,
    newPassword: string,
    oldPassword: string
  ): Promise<unknown>
}
