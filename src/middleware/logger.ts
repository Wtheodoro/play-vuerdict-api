import { Request, Response, NextFunction } from 'express'
import chalk, { ChalkInstance } from 'chalk'

const logger = (request: Request, response: Response, next: NextFunction) => {
  const { method, protocol, originalUrl } = request

  const methodColors = {
    GET: chalk.green,
    POST: chalk.blue,
    PUT: chalk.yellow,
    DELETE: chalk.red,
  }

  const colorize: ChalkInstance =
    methodColors[method as keyof typeof methodColors] || chalk.white

  console.log(
    colorize(
      `
      ${method} 
      ${protocol}://${request.get('host')}${originalUrl}
      `
    )
  )

  next()
}

export default logger
