/**
 * /* eslint-disable
 *
 * @format
 */

// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLead = /* GraphQL */ `
  subscription OnCreateLead {
    onCreateLead {
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
          user {
            id
            firstName
            middleName
            lastName
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const onUpdateLead = /* GraphQL */ `
  subscription OnUpdateLead {
    onUpdateLead {
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
          user {
            id
            firstName
            middleName
            lastName
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const onDeleteLead = /* GraphQL */ `
  subscription OnDeleteLead {
    onDeleteLead {
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
          user {
            id
            firstName
            middleName
            lastName
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress {
    onCreateAddress {
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
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress {
    onUpdateAddress {
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
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress {
    onDeleteAddress {
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
export const onCreateContactDetail = /* GraphQL */ `
  subscription OnCreateContactDetail {
    onCreateContactDetail {
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
export const onUpdateContactDetail = /* GraphQL */ `
  subscription OnUpdateContactDetail {
    onUpdateContactDetail {
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
export const onDeleteContactDetail = /* GraphQL */ `
  subscription OnDeleteContactDetail {
    onDeleteContactDetail {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      userId
      leadId
      body
      createdAt
      updatedAt
      user {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      userId
      leadId
      body
      createdAt
      updatedAt
      user {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      userId
      leadId
      body
      createdAt
      updatedAt
      user {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;
