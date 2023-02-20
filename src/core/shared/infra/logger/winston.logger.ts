//Instance Winston
import {
  DefaultInput,
  ErrorInput,
  LoggerInterface,
  LoggerProps,
  logLevels
} from './logger.interface'
import { createLogger, format, transports, Logger } from 'winston'

export class WinstonLogger implements LoggerInterface {
  private logger: Logger
  svc: string
  req_id: string
  req_path: string
  req_method: string
  req_ua: string
  ts: Date
  caller?: string
  message?: string
  res_st_code?: number
  imp?: string
  err_code?: string
  err_category?: string

  constructor(readonly props: LoggerProps) {
    this.svc = props.svc
    this.req_id = props.req.req_id
    this.req_path = props.req.req_path
    this.req_method = props.req.req_method
    this.req_ua = props.req.req_ua
    this.ts = new Date()

    this.logger = createLogger({
      levels: logLevels,
      defaultMeta: {
        svc: this.svc,
        req_id: this.req_id,
        req_path: this.req_path,
        req_method: this.req_method,
        req_ua: this.req_ua,
        ts: this.ts
      },
      format: format.combine(format.json(), format.timestamp()),
      transports: [new transports.Console({ level: 'critical' })]
    })
  }

  private setCaller() {
    const err = new Error()
    const caller_line = err.stack.split('\n')[3]
    this.caller = caller_line.split(' ')[6]
  }

  info(input: DefaultInput) {
    this.setCaller()
    this.ts = new Date()
    this.message = input.message
    // this.logger.info({ ...input, caller: this.caller })
  }

  warn(input: DefaultInput) {
    this.setCaller()
    this.ts = new Date()
    this.message = input.message
    this.logger.warn({ ...input, caller: this.caller })
  }

  error(input: ErrorInput) {
    this.setCaller()
    this.ts = new Date()
    this.message = input.message
    this.imp = input.imp
    this.err_code = input.err_code
    this.err_category = input.err_category
    this.logger.error({ ...input, caller: this.caller })
  }

  debug(input: DefaultInput) {
    this.setCaller()
    this.ts = new Date()
    this.message = input.message
    this.logger.debug({ ...input, caller: this.caller })
  }

  critical(input: ErrorInput) {
    this.setCaller()
    this.ts = new Date()
    this.message = input.message
    this.imp = input.imp
    this.err_code = input.err_code
    this.err_category = input.err_category
    this.logger.log({
      level: 'critical',
      ...input,
      caller: this.caller
    })
  }
}
