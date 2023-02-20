interface IEnvHelper {
  accessKeyId: string
  secretAccessKeyId: string
  region: string
  adminPoolId: string
  doctorPoolId: string
  patientPoolId: string
  nursePoolId: string
  nurseClientPoolId: string
  adminClientPoolId: string
  doctorClientPoolId: string
  patientClientPoolId: string
  websocketEndpoint: string
  bucket: string
  bucketImg: string
  snsPlataform: string
}

const accessKeyId = process.env.PS_AWS_ACCESS_KEY_ID
const secretAccessKeyId = process.env.PS_AWS_SECRET_ACCESS_KEY_ID
const region = process.env.PS_AWS_REGION

const adminPoolId = process.env.PS_AWS_ADMIN_POOL_ID
const adminClientPoolId = process.env.PS_AWS_CLIENT_ID_ADMIN

const patientPoolId = process.env.PS_AWS_PATIENT_POOL_ID
const patientClientPoolId = process.env.PS_AWS_CLIENT_ID_PATIENT

const doctorPoolId = process.env.PS_AWS_DOCTOR_POOL_ID
const doctorClientPoolId = process.env.PS_AWS_CLIENT_ID_DOCTOR

const nursePoolId = process.env.PS_AWS_NURSE_POOL_ID
const nurseClientPoolId = process.env.PS_AWS_CLIENT_ID_NURSE

const bucket = process.env.PS_AWS_BUCKET
const bucketImg = process.env.PS_AWS_BUCKET_IMG
const websocketEndpoint = process.env.PS_WEBSOCKET_ENDPOINT
const snsPlataform = process.env.PS_AWS_SNS_PLATAFORM

const EnvHelper: IEnvHelper = {
  accessKeyId,
  secretAccessKeyId,
  region,
  adminPoolId,
  nurseClientPoolId,
  nursePoolId,
  doctorPoolId,
  patientPoolId,
  adminClientPoolId,
  doctorClientPoolId,
  patientClientPoolId,
  websocketEndpoint,
  bucket,
  bucketImg,
  snsPlataform
}

export { EnvHelper }
