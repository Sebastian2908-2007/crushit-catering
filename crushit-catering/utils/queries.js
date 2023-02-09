import {gql} from '@apollo/client';

export const CHECKOUT = gql`
query checkout($meals:[OrderInput]) {
  checkout(meals:$meals) {
  session
  }
}
`;