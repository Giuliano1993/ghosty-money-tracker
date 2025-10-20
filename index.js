import Fastify from "fastify";
import 'dotenv/config';
import fastifyMysql from "@fastify/mysql";
import contiRoutes from "./routes/conti.js";
import operazioniRoutes from "./routes/operazioni.js";
import schema from './schema.js'
import QueryResolver from "./resolvers/Query.js";
import OperazioneResolver from "./resolvers/Operazione.js";
import ContoResolver from "./resolvers/Conto.js";
const fastify = Fastify({
  logger: true
});

const { DB_USERNAME: dbUser, DB_PASSWORD: dbPass, DB_NAME: dbName, DB_HOST: dbHost } = process.env;
const resolvers = {
  Query: QueryResolver(fastify),
  Operazione: OperazioneResolver(fastify),
  Conto: ContoResolver(fastify),
  Mutation: {
    CreateOperazione: async (parent, args, context) => {
      const { input } = args;
      context.app.log.info('Creting operazione', input)
      const connection = await fastify.mysql.getConnection();
      const result = await connection.query("INSERT INTO operazioni (descrizione, importo, tipo, conto_id) VALUES (?, ?, ?, ?)", [input.Descrizione, input.Importo, input.Tipo, input.Conto]);
      const [rows] = await connection.query("SELECT * FROM operazioni WHERE id = ?", [result[0].insertId]);
      connection.release()
      return rows[0];
    },
    CreateConto: async (parent, args, context) => {
      const { input } = args;
      context.app.log.info("Creating Conto", input)
      const connection = await fastify.mysql.getConnection();
      const result = await connection.query("INSERT INTO conti (nome) VALUES (?)", [input.Nome]);
      const [rows] = await connection.query("SELECT * FROM conti WHERE id = ?",[result[0].insertId])
      connection.release()
      return rows[0]
    },
    CreateGiroconto: async (parent, args, context) => {
      const { input } = args;
      context.app.log.info("Creating Giroconto",input)
      try{

        const connection = await fastify.mysql.getConnection();
        const resultFrom = await connection.query("INSERT INTO operazioni (descrizione, conto_id, importo, tipo) VALUES (?,?,?,?)",["Giroconto in uscita", input.ContoFrom, input.Importo, "Uscita"])
        const resultTo = await connection.query("INSERT INTO operazioni (descrizione, conto_id, importo, tipo) VALUES (?,?,?,?)",["Giroconto in entrata", input.ContoTo, input.Importo, "Entrata"])
        connection.release()
        return true
      }catch(err){
        connection.release()
        return false
      }


    }
  }
}

const mutations =
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
