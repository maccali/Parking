import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk'
import { AttributeListType } from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { PromiseResult } from 'aws-sdk/lib/request'
import { ICognitoProvider } from 'domain/providers/ICognitoProvider'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'

export class CognitoProvider implements ICognitoProvider {
  private userPool: AmazonCognitoIdentity.CognitoUserPool
  private cognitoProvider: CognitoIdentityServiceProvider
  logger: LoggerInterface

  constructor(userPoolId: string, clientId: string, logger: LoggerInterface) {
    this.cognitoProvider = new CognitoIdentityServiceProvider()
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: userPoolId,
      ClientId: clientId
    })
    this.logger = logger
  }

  async signUp(
    username: string,
    password: string
  ): Promise<
    PromiseResult<CognitoIdentityServiceProvider.SignUpResponse, AWSError>
  > {
    this.logger.info({ message: 'INIT signUp' })

    this.logger.info({ message: 'EXEC this.cognitoProvider' })
    const signUpReq = await this.cognitoProvider
      .signUp({
        Username: username,
        Password: password,
        ClientId: this.userPool.getClientId()
      })
      .promise()

    this.logger.info({ message: JSON.stringify(signUpReq) })
    return signUpReq
  }

  async forceEmailVerified(username: string): Promise<void> {
    this.logger.info({ message: 'INIT forceEmailVerified' })

    this.logger.info({
      message: 'EXEC this.cognitoProvider.adminUpdateUserAttributes'
    })
    await this.cognitoProvider
      .adminUpdateUserAttributes({
        UserAttributes: [
          {
            Name: 'email_verified',
            Value: 'true'
          }
        ],
        UserPoolId: this.userPool.getUserPoolId(),
        Username: username
      })
      .promise()

    this.logger.info({ message: 'FINISH forceEmailVerified' })
  }

  async confirmSignUp(username: string): Promise<void> {
    this.logger.info({ message: 'Init confirmSignUp' })

    this.logger.info({
      message: 'EXEC this.cognitoProvider.adminConfirmSignUp'
    })
    const confirmSignUpReq = await this.cognitoProvider
      .adminConfirmSignUp({
        Username: username,
        UserPoolId: this.userPool.getUserPoolId()
      })
      .promise()

    this.logger.info({ message: JSON.stringify(confirmSignUpReq) })
  }

  async login(email: string, password: string) {
    this.logger.info({ message: 'INIT login' })

    this.logger.info({ message: 'EXEC AmazonCognitoIdentity.CognitoUser' })
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: this.userPool
    })

    this.logger.info({
      message: 'EXEC AmazonCognitoIdentity.AuthenticationDetails'
    })
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
      })

    this.logger.info({ message: 'RETURN OF Login ' })
    return await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result: any) => {
          const tokens = {
            token: result.getIdToken().getJwtToken(),
            payload: result.idToken.payload
          }
          this.logger.info({ message: 'PROMISE ROSOLVE login' })
          resolve(tokens)
        },
        onFailure: (error: any) => {
          this.logger.info({ message: 'PROMISE REJECT login' })
          reject(error)
        }
      })
    })
  }

  async forgotPassword(email: string) {
    this.logger.info({ message: 'INIT forgotPassword' })

    this.logger.info({ message: 'EXEC AmazonCognitoIdentity.CognitoUser' })
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: this.userPool
    })

    this.logger.info({ message: 'RETORN OF forgotPassword' })
    return await new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result: any) => {
          this.logger.info({ message: 'PROMISE ROSOLVE forgotPassword' })
          resolve(result)
        },
        onFailure: error => {
          this.logger.info({ message: 'PROMISE REJECT forgotPassword' })
          reject(error)
        }
      })
    })
  }

  async resetPassword(
    email: string,
    newPassword: string,
    verificationCode: string
  ) {
    this.logger.info({ message: 'INIT resetPassword' })

    this.logger.info({ message: 'EXEC AmazonCognitoIdentity.CognitoUser' })
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: this.userPool
    })

    this.logger.info({ message: 'RETURN OF resetPassword' })
    return await new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          this.logger.info({ message: 'PROMISE ROSOLVE resetPassword' })
          resolve({
            message: 'password Changed'
          })
        },
        onFailure: error => {
          this.logger.info({ message: 'PROMISE REJECT resetPassword' })
          reject({
            ...error
          })
        }
      })
    })
  }

  async changePassword(
    email: string,
    newPassword: string,
    oldPassword: string
  ) {
    this.logger.info({ message: 'INIT changePassword' })

    this.logger.info({ message: 'EXEC AmazonCognitoIdentity.CognitoUser' })
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: this.userPool
    })

    this.logger.info({
      message: 'EXEC AmazonCognitoIdentity.AuthenticationDetails'
    })
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: oldPassword
      })

    this.logger.info({ message: 'RETURN OF changePassword' })
    return await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async function (result: any) {
          this.logger.info({
            message: 'PROMISE ROSOLVE changePassword.authenticateUser'
          })
          cognitoUser.changePassword(
            oldPassword,
            newPassword,
            (error, data) => {
              if (error) {
                this.logger.info({
                  message:
                    'PROMISE REJECT changePassword.authenticateUser.changePassword'
                })
                reject(error)
              }
              this.logger.info({
                message:
                  'PROMISE RESOLVE changePassword.authenticateUser.changePassword'
              })
              resolve(data)
            }
          )
        },
        onFailure: function (error) {
          this.logger.info({
            message: 'PROMISE REJECT changePassword.authenticateUser'
          })
          reject(error)
        }
      })
    })
  }

  async updateUserAttributes(
    username: string,
    userAttributes: AttributeListType
  ): Promise<void> {
    this.logger.info({ message: 'INIT updateUserAttributes' })

    this.logger.info({
      message: 'EXEC this.cognitoProvider.adminUpdateUserAttributes'
    })
    await this.cognitoProvider
      .adminUpdateUserAttributes({
        UserAttributes: userAttributes,
        UserPoolId: this.userPool.getUserPoolId(),
        Username: username
      })
      .promise()

    this.logger.info({ message: 'FINISH updateUserAttributes' })
  }
}
