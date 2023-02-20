import { LoggerInterface, LoggerProps } from './logger.interface'
import { WinstonLogger } from './winston.logger'

describe('WinstonLogger Unit Tests', () => {
  let winston: LoggerInterface
  let winstonProps: LoggerProps
  beforeEach(() => {
    winstonProps = {
      svc: 'testSvc',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test'
      }
    }
    winston = new WinstonLogger(winstonProps)
  })
  it('should accept a required logger props passed in constructor', () => {
    const loggerProps = {
      svc: 'testSvc',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test'
      }
    }
    const logger = new WinstonLogger(loggerProps)
    expect(logger.svc).toStrictEqual(loggerProps.svc)
    expect(logger.req_id).toStrictEqual(loggerProps.req.req_id)
    expect(logger.req_method).toStrictEqual(loggerProps.req.req_method)
    expect(logger.req_path).toStrictEqual(loggerProps.req.req_path)
    expect(logger.req_ua).toStrictEqual(loggerProps.req.req_ua)
  })

  it('should logger sucess all levels', () => {
    const infoLoggerProps = { message: 'info log' }
    winston.info(infoLoggerProps)
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:39:13)`
    )
    expect(winston.message).toStrictEqual(infoLoggerProps.message)

    const warnLoggerProps = { message: 'warn log' }
    winston.warn(warnLoggerProps)
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:46:13)`
    )
    expect(winston.message).toStrictEqual(warnLoggerProps.message)

    const debugLoggerProps = { message: 'debug log' }
    winston.debug(debugLoggerProps)
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:53:13)`
    )
    expect(winston.message).toStrictEqual(debugLoggerProps.message)

    const errorLoggerProps = {
      message: 'error log',
      imp: 'create a error log',
      err_code: 'ERROR_LOG',
      err_category: 'ERROR'
    }
    winston.error(errorLoggerProps)
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:65:13)`
    )
    expect(winston.message).toStrictEqual(errorLoggerProps.message)

    const criticalLoggerProps = {
      message: 'critical log',
      imp: 'create a critical log',
      err_code: 'ERROR_LOG',
      err_category: 'ERROR'
    }
    winston.critical(criticalLoggerProps)
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:77:13)`
    )
    expect(winston.message).toStrictEqual(criticalLoggerProps.message)
  })
})
