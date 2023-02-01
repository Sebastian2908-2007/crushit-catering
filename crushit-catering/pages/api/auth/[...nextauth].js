import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import TwitterProvider from 'next-auth/providers/twitter'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from '@/db/config/authAdaptor';

export default NextAuth({
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET,
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	pages: {
		signIn: '/signin',
	},
	adapter: MongoDBAdapter(clientPromise),
})