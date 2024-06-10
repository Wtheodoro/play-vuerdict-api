import { Request, Response, NextFunction } from 'express'
import { HttpError } from './error'

const notFound = (request: Request, response: Response, next: NextFunction) => {
  const error: HttpError = new Error('Not found')
  error.status = 404

  next(error)
}

export default notFound
