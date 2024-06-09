import colors from 'colors'

const logger = (request, response, next) => {
  const { method, protocol, originalUrl } = request
  const methodColors = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
  }

  const color = methodColors[method] || white

  console.log(
    `
    ${method} 
    ${protocol}://${request.get('host')}${originalUrl}
    `[color]
  )

  next()
}

export default logger
