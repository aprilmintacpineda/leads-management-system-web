/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCognitoUser = /* GraphQL */ `
  mutation CreateCognitoUser($email: String, $groups: AWSJSON) {
    createCognitoUser(email: $email, groups: $groups)
  }
`;
export const resendTempPass = /* GraphQL */ `
  mutation ResendTempPass($email: String) {
    resendTempPass(email: $email)
  }
`;
export const enableUserAccount = /* GraphQL */ `
  mutation EnableUserAccount($id: String) {
    enableUserAccount(id: $id)
  }
`;
export const disableUserAccount = /* GraphQL */ `
  mutation DisableUserAccount($id: String) {
    disableUserAccount(id: $id)
  }
`;
export const updateUserGroups = /* GraphQL */ `
  mutation UpdateUserGroups($id: String, $groups: AWSJSON) {
    updateUserGroups(id: $id, groups: $groups)
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      isDisabled
      status
      email
      groups
      profilePicture
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      isDisabled
      status
      email
      groups
      profilePicture
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      isDisabled
      status
      email
      groups
      profilePicture
      createdAt
      updatedAt
    }
  }
`;
export const createLeadStatus = /* GraphQL */ `
  mutation CreateLeadStatus(
    $input: CreateLeadStatusInput!
    $condition: ModelLeadStatusConditionInput
  ) {
    createLeadStatus(input: $input, condition: $condition) {
      id
      name
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateLeadStatus = /* GraphQL */ `
  mutation UpdateLeadStatus(
    $input: UpdateLeadStatusInput!
    $condition: ModelLeadStatusConditionInput
  ) {
    updateLeadStatus(input: $input, condition: $condition) {
      id
      name
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteLeadStatus = /* GraphQL */ `
  mutation DeleteLeadStatus(
    $input: DeleteLeadStatusInput!
    $condition: ModelLeadStatusConditionInput
  ) {
    deleteLeadStatus(input: $input, condition: $condition) {
      id
      name
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const createLead = /* GraphQL */ `
  mutation CreateLead($input: CreateLeadInput!, $condition: ModelLeadConditionInput) {
    createLead(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      gender
      profilePicture
      leadStatusId
      createdAt
      updatedAt
      leadStatus {
        id
        name
        deletedAt
        createdAt
        updatedAt
      }
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
            isDisabled
            status
            email
            groups
            profilePicture
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const updateLead = /* GraphQL */ `
  mutation UpdateLead($input: UpdateLeadInput!, $condition: ModelLeadConditionInput) {
    updateLead(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      gender
      profilePicture
      leadStatusId
      createdAt
      updatedAt
      leadStatus {
        id
        name
        deletedAt
        createdAt
        updatedAt
      }
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
            isDisabled
            status
            email
            groups
            profilePicture
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const deleteLead = /* GraphQL */ `
  mutation DeleteLead($input: DeleteLeadInput!, $condition: ModelLeadConditionInput) {
    deleteLead(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      gender
      profilePicture
      leadStatusId
      createdAt
      updatedAt
      leadStatus {
        id
        name
        deletedAt
        createdAt
        updatedAt
      }
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
            isDisabled
            status
            email
            groups
            profilePicture
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
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
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
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
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
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
export const createContactDetail = /* GraphQL */ `
  mutation CreateContactDetail(
    $input: CreateContactDetailInput!
    $condition: ModelContactDetailConditionInput
  ) {
    createContactDetail(input: $input, condition: $condition) {
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
export const updateContactDetail = /* GraphQL */ `
  mutation UpdateContactDetail(
    $input: UpdateContactDetailInput!
    $condition: ModelContactDetailConditionInput
  ) {
    updateContactDetail(input: $input, condition: $condition) {
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
export const deleteContactDetail = /* GraphQL */ `
  mutation DeleteContactDetail(
    $input: DeleteContactDetailInput!
    $condition: ModelContactDetailConditionInput
  ) {
    deleteContactDetail(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote($input: CreateNoteInput!, $condition: ModelNoteConditionInput) {
    createNote(input: $input, condition: $condition) {
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
        isDisabled
        status
        email
        groups
        profilePicture
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote($input: UpdateNoteInput!, $condition: ModelNoteConditionInput) {
    updateNote(input: $input, condition: $condition) {
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
        isDisabled
        status
        email
        groups
        profilePicture
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote($input: DeleteNoteInput!, $condition: ModelNoteConditionInput) {
    deleteNote(input: $input, condition: $condition) {
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
        isDisabled
        status
        email
        groups
        profilePicture
        createdAt
        updatedAt
      }
    }
  }
`;
