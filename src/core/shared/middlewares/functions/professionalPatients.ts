import { NextApiRequest } from 'next'
import { Auth } from 'shared/middlewares/Auth'
import { EnvHelper } from 'shared/utils/envHelper'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'

const DOCTOR_POOL_ID = EnvHelper.doctorPoolId
const DOCTOR_CLIENT_ID_USER = EnvHelper.doctorClientPoolId
const NURSE_POOL_ID = EnvHelper.nursePoolId
const NURSE_CLIENT_ID_USER = EnvHelper.nurseClientPoolId

interface MiddlewareReturn {
  status: number
  message?: object
  data?: object
}

export async function professionalPatientsMiddleware(
  request: NextApiRequest,
  Logger: LoggerInterface
): Promise<MiddlewareReturn> {
  const { token } = request.headers
  const { professionalId } = request.query
  const auth = new Auth(Logger)
  const validResponseDoctor: any = await auth.allowItself(
    token,
    DOCTOR_POOL_ID,
    DOCTOR_CLIENT_ID_USER,
    professionalId as string
  )
  const validResponseNurse: any = await auth.allowItself(
    token,
    NURSE_POOL_ID,
    NURSE_CLIENT_ID_USER,
    professionalId as string
  )

  const pollsChecked = [validResponseNurse, validResponseDoctor]

  if (
    !pollsChecked.some(item => {
      return item
    })
  ) {
    const message = {
      message: 'Access denied'
    }
    return { status: 403, message }
  }
  return { status: 200 }
}
