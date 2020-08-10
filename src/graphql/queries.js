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
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchUsers(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
      }
      nextToken
      total
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
      profilePicture
      createdAt
      updatedAt
      addresses {
        items {
          id
          type
          country
          state
          line1
          line2
          leadId
          createdAt
          updatedAt
        }
        nextToken
      }
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
        profilePicture
        createdAt
        updatedAt
        addresses {
          items {
            id
            type
            country
            state
            line1
            line2
            leadId
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const searchLeads = /* GraphQL */ `
  query SearchLeads(
    $filter: SearchableLeadFilterInput
    $sort: SearchableLeadSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchLeads(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        middleName
        lastName
        gender
        profilePicture
        createdAt
        updatedAt
        addresses {
          items {
            id
            type
            country
            state
            line1
            line2
            leadId
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
      total
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      type
      country
      state
      line1
      line2
      leadId
      createdAt
      updatedAt
    }
  }
`;
export const listAddresss = /* GraphQL */ `
  query ListAddresss($filter: ModelAddressFilterInput, $limit: Int, $nextToken: String) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        country
        state
        line1
        line2
        leadId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchAddresss = /* GraphQL */ `
  query SearchAddresss(
    $filter: SearchableAddressFilterInput
    $sort: SearchableAddressSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchAddresss(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        country
        state
        line1
        line2
        leadId
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
