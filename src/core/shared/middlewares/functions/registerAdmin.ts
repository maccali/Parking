import { NextApiRequest } from 'next'
import { Auth } from 'shared/middlewares/Auth'
import { EnvHelper } from 'shared/utils/envHelper'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'

const USER_POOL_ID = EnvHelper.adminPoolId
const CLIENT_ID_USER = EnvHelper.adminClientPoolId

interface MiddlewareReturn {
  status: number
  message?: object
  data?: object
}

export async function registerAdminMiddleware(
  request: NextApiRequest,
  Logger: LoggerInterface
): Promise<MiddlewareReturn> {
  const { token } = request.headers
  const auth = new Auth(Logger)
  const validResponse: any = await auth.valid(
    token,
    USER_POOL_ID,
    CLIENT_ID_USER
  )
  if (!validResponse) {
    const message = {
      message: 'Access denied'
    }
    return { status: 403, message }
  }
  return { status: 200 }
}
