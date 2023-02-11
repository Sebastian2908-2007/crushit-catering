import {gql} from '@apollo/client';

export const CHECKOUT = gql`
query checkout($meals:[OrderInput]) {
  checkout(meals:$meals) {
  session
  }
}
`;

export const GET_ONE_USER = gql`
query getUser($userName:String!) {
  getUser(userName:$userName) {
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