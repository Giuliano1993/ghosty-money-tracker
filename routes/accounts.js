/**
 *
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function accountsRoutes(fastify, options) {

  fastify.get('/accounts', function (request, response) {
    fastify.mysql.query('SELECT * FROM accounts', [],
      function onResult(err, result) {
        response.send(err || result)
      })
  })

}
export default accountsRoutes
