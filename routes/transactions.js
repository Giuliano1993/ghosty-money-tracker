/**
 *
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function transactionsRoutes(fastify, options){
  fastify.get('/transactions', function (request, response) {
    fastify.mysql.query('SELECT * FROM transactions',[],
      function onResult(err, result) {
        response.send(err || result)
      })
  })


  fastify.post('/transactions', function (request, response) {
    const { amount, description, type, account_id } = request.body;
    fastify.mysql.query('INSERT INTO transactions (amount, description, type, account_id) VALUES (?, ?, ?, ?)',[
      amount, description, type, account_id
    ], function onResult(err, result) {
      response.send(err||result)
    })
  })
}

export default transactionsRoutes;
