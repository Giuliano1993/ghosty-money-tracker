/**
 *
 * @param {FastifyInstance} fastify
 * @returns
 */
function QueryResolver(fastify) {
  return {
    hello: async()=>"hello with graphql",
    transactions: async () =>{

      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        'SELECT ID, amount, description, Account_id as account FROM transactions'
      )
      connection.release();
      return rows;
    },
    accounts: async () =>{
      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        'SELECT * FROM accounts'
      )
      connection.release()
      return rows
    },
    //TODO
    //totalePatrimonio
  }
}
export default QueryResolver
