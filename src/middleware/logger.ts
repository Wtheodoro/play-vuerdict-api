import { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'

const logger = (request: Request, response: Response, next: NextFunction) => {
  const { method, protocol, originalUrl } = request

  const methodColors = {
    GET: chalk.green,
    POST: chalk.blue,
    PUT: chalk.yellow,
    DELETE: chalk.red,
  }

  console.log(method)
  const colorize = methodColors[method] || chalk.white

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
