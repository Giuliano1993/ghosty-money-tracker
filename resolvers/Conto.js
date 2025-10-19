/**
 *
 * @param {FastifyInstance} fastify
 */
function ContoResolver(fastify) {
  return  {
      Operazioni: async function (parent) {
        console.log(parent);
        const connection = await fastify.mysql.getConnection();
        const [operazioni] = await connection.query('SELECT * FROM operazioni where Conto_id = ?',[parent.ID])
        return operazioni;
      }
    }
}

export default ContoResolver
