import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {typeDefs,resolvers} from '../../db/schemas';
import dbConnect from '@/db/config/connection';

dbConnect();

const server = new ApolloServer({
    resolvers,
    typeDefs,
  });
  



  export default startServerAndCreateNextHandler(server);