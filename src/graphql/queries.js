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
      contactDetails {
        items {
          id
          leadId
          category
          type
          description
          value
          createdAt
          updatedAt
        }
        nextToken
      }
      notes {
        items {
          id
          userId
          leadId
          body
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
        contactDetails {
          items {
            id
            leadId
            category
            type
            description
            value
            createdAt
            updatedAt
          }
          nextToken
        }
        notes {
          items {
            id
            userId
            leadId
            body
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
        contactDetails {
          items {
            id
            leadId
            category
            type
            description
            value
            createdAt
            updatedAt
          }
          nextToken
        }
        notes {
          items {
            id
            userId
            leadId
            body
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
export const getContactDetail = /* GraphQL */ `
  query GetContactDetail($id: ID!) {
    getContactDetail(id: $id) {
      id
      leadId
      category
      type
      description
      value
      createdAt
      updatedAt
    }
  }
`;
export const listContactDetails = /* GraphQL */ `
  query ListContactDetails(
    $filter: ModelContactDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        leadId
        category
        type
        description
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchContactDetails = /* GraphQL */ `
  query SearchContactDetails(
    $filter: SearchableContactDetailFilterInput
    $sort: SearchableContactDetailSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchContactDetails(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        leadId
        category
        type
        description
        value
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      userId
      leadId
      body
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes($filter: ModelNoteFilterInput, $limit: Int, $nextToken: String) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        leadId
        body
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchNotes = /* GraphQL */ `
  query SearchNotes(
    $filter: SearchableNoteFilterInput
    $sort: SearchableNoteSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchNotes(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        leadId
        body
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
