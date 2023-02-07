import {gql} from "graphql-tag";

const typeDefs = gql`
  type Address {
      streetAddress: String
      city: String
      state: String
      zip: String
      country: String
  }
type Meal {
  drink: String,
  image: String,
  main: String,
  price: String,
  purchaseQuantity: String,
  total: String,
  _id: String,
}

  type User {
    _id: ID
    userName: String
    orders:[Order]
    address: Address
   createdAt: String
  }
  
  type Order {
  _id: ID
  isDelivery: Boolean
  purchaseDate: String
  meals:[Meal]
}

input OrderInput {
  
      drink: String
      image: String
      main: String
      price: String
      purchaseQuantity: String
      total: String
      _id: String
  
} 

input AddressInput {
      userName:String!
      streetAddress: String!
      city: String!
      state: String!
      zip: String!
      country: String!
  }

  type Query {
    getUsers:[User]
    getUser(userName:String): User
  }
  type Mutation {
    #Products
    newUser(userName:String!): User
    updateUserAddress(input:AddressInput): User
    addOrder(isDelivery: Boolean, userName:String! meals:[OrderInput]): User
  }
`

module.exports = typeDefs;