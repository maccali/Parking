import { NextApiRequest } from 'next'
import { Auth } from 'shared/middlewares/Auth'
import { EnvHelper } from 'shared/utils/envHelper'
import { CreateRightSolver } from 'shared/solvers/right/registerRightSolver'
import { GenericLeftSolver } from 'shared/solvers/left/genericLeftSolver'
import { Either, left, right } from 'shared/either'
import { IError } from 'shared/IError'
import { ISuccess } from 'shared/ISuccess'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'

const USER_POOL_ID = EnvHelper.adminPoolId
const CLIENT_ID_USER = EnvHelper.adminClientPoolId

export async function registerNurseMiddleware(
  request: NextApiRequest,
  Logger: LoggerInterface
): Promise<Either<IError, ISuccess>> {
  const { token } = request.headers
  const auth = new Auth(Logger)
  const validResponse: any = await auth.valid(
    token,
    USER_POOL_ID,
    CLIENT_ID_USER
  )
  if (!validResponse) {
    return left(GenericLeftSolver.invalidResponse())
  }
  return right(CreateRightSolver.rightCreated(validResponse))
}
