const errorHandler = (error, request, response, next) => {
  if (error.status) {
    return response.status(error.status).json({ msg: error.message })
  }

  response.status(500).json({ msg: error.message })
}

export default errorHandler
