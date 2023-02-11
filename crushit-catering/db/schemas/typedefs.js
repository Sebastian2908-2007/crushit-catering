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
  price: Float,
  purchaseQuantity: Int,
  total: String,
  _id: Int,
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
      price: Float
      purchaseQuantity: Int
      total: String
      _id: Int
  
} 

input AddressInput {
      userName:String!
      streetAddress: String!
      city: String!
      state: String!
      zip: String!
      country: String!
  }
type Checkout {
session: ID
}

  type Query {
    getUsers:[User]
    getUser(userName:String!): User
    checkout(meals:[OrderInput]): Checkout
  }
  type Mutation {
    newUser(userName:String!): User
    updateUserAddress(input:AddressInput): User
    addOrder(isDelivery: Boolean, userName:String! meals:[OrderInput]): User
    deleteUser(userName:String!): User
  }
`

module.exports = typeDefs;

