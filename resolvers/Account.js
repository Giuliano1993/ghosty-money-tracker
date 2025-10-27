/**
 *
 * @param {FastifyInstance} fastify
 */
function AccountResolver(fastify) {
  return  {
      transactions: async function (parent) {
        console.log(parent);
        const connection = await fastify.mysql.getConnection();
        const [transactions] = await connection.query('SELECT * FROM transactions where account_id = ?',[parent.ID])
        return transactions;
      },
     balance: async function (parent){
        const connection = await fastify.mysql.getConnection();
        const [transactions] = await connection.query('SELECT SUM(CASE WHEN type = "Entrata" THEN amount ELSE -amount END) as balance FROM transactions where account_id = ?',[parent.ID])
        console.log(transactions)
        return transactions[0].balance
      }
    }
}

export default AccountResolver
