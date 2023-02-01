import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from '@/db/config/authAdaptor';
/**in production I will need to back to all of these accounts and add my production urls */
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
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			/**this will cause a user to verify which account to use each time I put it up for development,but will prob tak out in production*/
			authorization: {
				params: {
				  prompt: "consent",
				  access_type: "offline",
				  response_type: "code"
				}
			  }
		}),
	],
	pages: {
		signIn: '/signin',
	},
	adapter: MongoDBAdapter(clientPromise),
})