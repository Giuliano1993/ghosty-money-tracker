/**
 * @param {FastifyInstance} fastify
 */
function MutationResolver(fastify) {
  return {
      createTransaction: async (parent, args, context) => {
        const { input } = args;
        context.app.log.info('Creting transaction', input)
        const connection = await fastify.mysql.getConnection();
        const result = await connection.query(
          "INSERT INTO transactions (description, amount, type, account_id) VALUES (?, ?, ?, ?)"
          , [input.description, input.amount, input.type, input.account]
        );
        const [rows] = await connection.query(
          "SELECT * FROM transactions WHERE id = ?",
          [result[0].insertId]);
        connection.release()
        return rows[0];
      },
      createAccount: async (parent, args, context) => {
        const { input } = args;
        context.app.log.info("Creating Account", input)
        const connection = await fastify.mysql.getConnection();
        const result = await connection.query(
          "INSERT INTO accounts (name) VALUES (?)",
          [input.name]
        );
        const [rows] = await connection.query(
          "SELECT * FROM accounts WHERE id = ?",
          [result[0].insertId])
        connection.release()
        return rows[0]
      },
      createTransfer: async (parent, args, context) => {
        const { input } = args;
        context.app.log.info("Creating Transfer",input)
        try{

          const connection = await fastify.mysql.getConnection();
          const resultFrom = await connection.query(
            "INSERT INTO transactions (description, account_id, amount,type) VALUES (?,?,?,?)",
            ["Transfer in uscita", input.qccountFrom, input.amount, "Uscita"]
          )
          const resultTo = await connection.query(
            "INSERT INTO transactions (description, account_id, amount, type) VALUES (?,?,?,?)",
            ["Transfer in entrata", input.accountTo, input.amount, "Entrata"])
          connection.release()
          return true
        }catch(err){
          connection.release()
          return false
        }


      }
    }
}

export default MutationResolver
