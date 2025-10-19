/**
 *
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function contiRoutes(fastify, options) {

  fastify.get('/conti', function (request, response) {
    fastify.mysql.query('SELECT * FROM conti', [],
      function onResult(err, result) {
        response.send(err || result)
      })
  })

}
export default contiRoutes
