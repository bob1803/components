import { gql } from "apollo-boost";

export const configMenu = gql`
  query menuConfig {
    title
    link
  }
`;
