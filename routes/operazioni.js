/**
 *
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function operazioniRoutes(fastify, options){
  fastify.get('/operazioni', function (request, response) {
    fastify.mysql.query('SELECT * FROM operazioni',[],
      function onResult(err, result) {
        response.send(err || result)
      })
  })


  fastify.post('/operazioni', function (request, response) {
    const { importo, descrizione, tipo, conto_id } = request.body;
    fastify.mysql.query('INSERT INTO operazioni (importo, descrizione, tipo, conto_id) VALUES (?, ?, ?, ?)',[
      importo, descrizione, tipo, conto_id
    ], function onResult(err, result) {
      response.send(err||result)
    })
  })
}

export default operazioniRoutes;
