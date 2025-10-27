import Fastify from "fastify";
import 'dotenv/config';
import fastifyMysql from "@fastify/mysql";
import accountsRoutes from "./routes/accounts.js";
import transactionsRoutes from "./routes/transactions.js";
import schema from './schema.js'
import QueryResolver from "./resolvers/Query.js";
import TransactionResolver from "./resolvers/Transaction.js";
import AccountResolver from "./resolvers/Account.js";
import MutationResolver from "./resolvers/Mutation.js";
const fastify = Fastify({
  logger: true
});

const { DB_USERNAME: dbUser, DB_PASSWORD: dbPass, DB_NAME: dbName, DB_HOST: dbHost } = process.env;
const resolvers = {
  Query: QueryResolver(fastify),
  Transaction: TransactionResolver(fastify),
  Account: AccountResolver(fastify),
  Mutation: MutationResolver(fastify)
}

const mutations =
fastify.register(accountsRoutes);
fastify.register(transactionsRoutes);

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
