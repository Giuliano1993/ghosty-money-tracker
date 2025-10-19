import Fastify from "fastify";
import 'dotenv/config';
import fastifyMysql from "@fastify/mysql";
import contiRoutes from "./routes/conti.js";
import operazioniRoutes from "./routes/operazioni.js";
import schema from './schema.js'
const fastify = Fastify({
  logger: true
});

const { DB_USERNAME: dbUser, DB_PASSWORD: dbPass, DB_NAME: dbName, DB_HOST: dbHost } = process.env;
fastify.get('/', function (request, response) {
 response.send({hello:'world'})
})
const resolvers = {
  Query: {
    hello: async()=>"hello with graphql",
    operazioni: async () =>{

      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        'SELECT * FROM operazioni'
      )
      const res = rows.map(async (o)=>{
        const [conti] = await connection.query('SELECT * FROM conti WHERE id = ?',[o.Conto_id])
        console.log(o, conti);
        o.Conto_id = conti[0];
        return o;
      })
      connection.release();
      return res
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

fastify.register(contiRoutes);
fastify.register(operazioniRoutes);

fastify.register(fastifyMysql, {
  user:dbUser,
  password:dbPass,
  host:dbHost,
  database:dbName,
  promise: true
})
fastify.register(import('mercurius'),{
  schema,
  resolvers,
  graphiql:true
})
fastify.listen({ port: 3000 }, function (err, address) {
  if(err){
    fastify.log.error(err);
    console.log(err)
    process.exit(1);
  }
  console.log(process.env)
})
