/**
 * /* eslint-disable
 *
 * @format
 */

// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLead = /* GraphQL */ `
  query GetLead($id: ID!) {
    getLead(id: $id) {
      id
      firstName
      middleName
      lastName
      gender
      createdAt
      updatedAt
    }
  }
`;
export const listLeads = /* GraphQL */ `
  query ListLeads($filter: ModelLeadFilterInput, $limit: Int, $nextToken: String) {
    listLeads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        middleName
        lastName
        gender
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
