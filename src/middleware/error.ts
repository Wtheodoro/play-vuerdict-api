import { Request, Response, NextFunction } from 'express'

export interface HttpError extends Error {
  status?: number
}

const errorHandler = (
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.status) {
    return response.status(error.status).json({ msg: error.message })
  }

  response.status(500).json({ msg: error.message })
}

export default errorHandler
