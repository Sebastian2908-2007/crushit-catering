import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {typeDefs,resolvers} from '../../db/schemas';
import dbConnect from '@/db/config/connection';


dbConnect();

const server = new ApolloServer({
    resolvers,
    typeDefs,
    csrfPrevention: true,
    cache: 'bounded',
  });
  



  export default startServerAndCreateNextHandler(server,{
    context:  (req,res) => { return   req } 
    //context: async (req, res) => ({ req, res, user: await getReq(req) })
  });