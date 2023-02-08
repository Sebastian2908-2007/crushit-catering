import { gql } from "@apollo/client";

export const NEW_USER = gql`
mutation newUser($userName:String!) {
  newUser(userName:$userName) {
    userName
    address {
      city
      country
      zip
      streetAddress
      state
    }
    createdAt
  }
}
`;

export const ADD_ADDRESS = gql`
mutation updateUserAddress(
    $userName:String!,
    $streetAddress:String!,
    $city:String!,
    $state:String!,
    $zip:String!,
    $country:String!
            )
         {
  updateUserAddress(
    input:{
    userName:$userName,
    streetAddress:$streetAddress,
    city:$city,
    state:$state,
    zip:$zip,
    country:$country
          }) {
    userName
    address {
      city
      country
      zip
      state
      streetAddress
    }
  }
}
`;

export const ADD_ORDER = gql`
mutation addOrder($isDelivery:Boolean,$userName:String!,$meals:[OrderInput]) {
  addOrder(isDelivery:$isDelivery,userName:$userName,meals:$meals) {
    userName
    orders {
      _id
      isDelivery
      meals {
        _id
        drink
        main
        price
        image
        purchaseQuantity
        total
      }
    }
  }
}
`;