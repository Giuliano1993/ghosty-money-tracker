/**
 *
 * @param {FastifyInstance} fastify
 */
function OperazioneResolver(fastify){
  return {
      Conto: async function(parent){
        const connection = await fastify.mysql.getConnection();
        const [conti] = await connection.query('SELECT * FROM conti WHERE id = ?',[parent.Conto])
        return conti[0];
      }
    }
}

export default OperazioneResolver
