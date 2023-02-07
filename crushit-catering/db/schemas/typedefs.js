import {gql} from "graphql-tag";

const typeDefs = gql`
  type Address {
      StreetAddress: String
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
      StreetAddress: String
      city: String
      state: String
      zip: String
      country: String
  }

  type Query {
    getUsers:[User]
    getUser(userName:String): User
  }
  type Mutation {
    #Products
    newUser(userName:String!): User
    updateUserAddress(userName:String!,address:AddressInput): User
    addOrder(isDelivery: Boolean, meals:[OrderInput]): Order
  }
`

module.exports = typeDefs;