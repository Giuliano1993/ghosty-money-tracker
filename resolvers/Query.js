/**
 *
 * @param {FastifyInstance} fastify
 * @returns
 */
function QueryResolver(fastify) {
  return {
    hello: async()=>"hello with graphql",
    operazioni: async () =>{

      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        'SELECT ID, Importo, Descrizione, Conto_id as Conto FROM operazioni'
      )
      connection.release();
      return rows;
    },
    conti: async () =>{
      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        'SELECT * FROM conti'
      )
      connection.release()
      return rows
    },
  }
}
export default QueryResolver
