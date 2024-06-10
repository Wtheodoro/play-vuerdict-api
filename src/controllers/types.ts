import { Request } from 'express'
import { Query } from 'express-serve-static-core'

export interface ControllerRequest<T extends Query> extends Request {
  query: T
}
