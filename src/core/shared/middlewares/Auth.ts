import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import Verifier from 'verify-cognito-token'
import { EnvHelper } from 'shared/utils/envHelper'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'

export class Auth {
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.logger = logger
  }

  async valid(token: any, USER_POOL_ID: string, CLIENT_ID: string) {
    this.logger.info({ message: 'INIT valid' })

    this.logger.info({ message: 'INIT valid try' })
    try {
      this.logger.info({ message: 'DECLARE' })
      const params = {
        region: EnvHelper.region,
        userPoolId: USER_POOL_ID,
        debug: true
      }
      const claims = {
        aud: CLIENT_ID
      }

      this.logger.info({ message: 'INSTANCE OF Verifier' })
      const verifier = new Verifier(params, claims)

      this.logger.info({ message: 'EXEC verifier.forgetPublicKeys' })
      verifier.forgetPublicKeys()

      this.logger.info({ message: 'EXEC decodePayload' })
      const userLogged = new AmazonCognitoIdentity.CognitoAccessToken({
        AccessToken: token
      }).decodePayload()

      this.logger.info({ message: 'EXEC verifier.verify' })
      const result = await verifier.verify(token)
      if (!result) {
        this.logger.info({ message: 'RETURN OF valid (false)' })
        return false
      }

      this.logger.info({ message: 'RETURN OF valid (object)' })
      return userLogged
    } catch (error) {
      this.logger.error({
        err_code: error['code'],
        message: error['meassage'],
        err_category: 'Mid Auth',
        imp: 'Forbidden to Auth'
      })
      this.logger.info({ message: 'RETURN OF valid (false)' })
      return false
    }
  }

  async allowItself(
    token: any,
    USER_POOL_ID: string,
    CLIENT_ID: string,
    idToBeCompered: string
  ) {
    this.logger.info({ message: 'INIT allowItself' })

    this.logger.info({ message: 'INIT allowItself TRY' })
    try {
      this.logger.info({ message: 'EXEC decodePayload' })
      const userLogged = new AmazonCognitoIdentity.CognitoAccessToken({
        AccessToken: token
      }).decodePayload()

      this.logger.info({ message: 'DECLARE' })
      const params = {
        region: EnvHelper.region,
        userPoolId: USER_POOL_ID,
        debug: true
      }
      const claims = {
        aud: CLIENT_ID
      }

      this.logger.info({ message: 'INSTANCE OF Verifier' })
      const verifier = new Verifier(params, claims)

      this.logger.info({ message: 'EXEC verifier.forgetPublicKeys' })
      verifier.forgetPublicKeys()

      this.logger.info({ message: 'EXEC verifier.verify' })
      const result = await verifier.verify(token)

      this.logger.info({ message: 'VERIFY sub' })
      if (result && userLogged.sub == idToBeCompered) {
        this.logger.info({ message: 'RETURN OF allowItself (true)' })
        return true
      }
      this.logger.info({ message: 'RETURN OF allowItself (false)' })
      return false
    } catch (error) {
      this.logger.error({
        err_code: error['code'],
        message: error['meassage'],
        err_category: 'Mid Auth',
        imp: 'Forbidden to Auth youself'
      })
      this.logger.info({ message: 'RETURN OF valid (false)' })
      return false
    }
  }
}
