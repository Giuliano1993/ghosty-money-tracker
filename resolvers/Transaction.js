/**
 *
 * @param {FastifyInstance} fastify
 */
function TransactionResolver(fastify){
  return {
      account: async function(parent){
        const connection = await fastify.mysql.getConnection();
        const [accounts] = await connection.query('SELECT * FROM accounts WHERE id = ?',[parent.account])
        return accounts[0];
      }
    }
}

export default TransactionResolver
