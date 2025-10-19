import Fastify from "fastify";
import 'dotenv/config';
import fastifyMysql from "@fastify/mysql";
import contiRoutes from "./routes/conti.js";
import operazioniRoutes from "./routes/operazioni.js";
const fastify = Fastify({
  logger: true
});

const { DB_USERNAME: dbUser, DB_PASSWORD: dbPass, DB_NAME: dbName, DB_HOST: dbHost } = process.env;
fastify.get('/', function (request, response) {
 response.send({hello:'world'})
})

fastify.register(contiRoutes);
fastify.register(operazioniRoutes);

fastify.register(fastifyMysql, {
  //why zed are you blocking my backthick
  connectionString: "mysql://"+dbUser+":"+dbPass+"@"+dbHost+"/"+dbName,
})
fastify.listen({ port: 3000 }, function (err, address) {
  if(err){
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(process.env)
})
