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
      },
      Saldo: async function (parent){
        const connection = await fastify.mysql.getConnection();
        const [operazioni] = await connection.query('SELECT SUM(CASE WHEN TIPO = "Entrata" THEN importo ELSE -importo END) as saldo FROM operazioni where Conto_id = ?',[parent.ID])
        console.log(operazioni)
        return operazioni[0].saldo
      }
    }
}

export default ContoResolver
