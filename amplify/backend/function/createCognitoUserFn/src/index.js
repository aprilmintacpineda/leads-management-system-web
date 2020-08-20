/**
 * /* Amplify Params - DO NOT EDIT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIENDPOINTOUTPUT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIIDOUTPUT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIKEYOUTPUT
 * 	API_LEADSMANAGEMENTSYS_USERTABLE_ARN
 * 	API_LEADSMANAGEMENTSYS_USERTABLE_NAME
 * 	AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID
 * 	ENV
 * 	REGION
 * 	STORAGE_S3453D1BD4_BUCKETNAME
 * Amplify Params - DO NOT EDIT
 *
 * @format
 */

/**
 * /* Amplify Params - DO NOT EDIT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIENDPOINTOUTPUT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIIDOUTPUT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIKEYOUTPUT
 * 	API_LEADSMANAGEMENTSYS_USERTABLE_ARN
 * 	API_LEADSMANAGEMENTSYS_USERTABLE_NAME
 * 	AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID
 * 	ENV
 * 	REGION
 * 	STORAGE_S3453D1BD4_BUCKETNAME
 * Amplify Params - DO NOT EDIT
 *
 * @format
 */

/**
 * /* Amplify Params - DO NOT EDIT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIENDPOINTOUTPUT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIIDOUTPUT
 * 	API_LEADSMANAGEMENTSYS_GRAPHQLAPIKEYOUTPUT
 * 	API_LEADSMANAGEMENTSYS_USERTABLE_ARN
 * 	API_LEADSMANAGEMENTSYS_USERTABLE_NAME
 * 	AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID
 * 	ENV
 * 	REGION
 * 	STORAGE_S3453D1BD4_BUCKETNAME
 * Amplify Params - DO NOT EDIT
 *
 * @format
 */

/** @format */

const aws = require('aws-sdk');

const CognitoISP = new aws.CognitoIdentityServiceProvider();

function createUser (email) {
  return CognitoISP.adminCreateUser({
    UserPoolId: process.env.AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID,
    Username: email,
    DesiredDeliveryMediums: ['EMAIL'],
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'email_verified',
        Value: 'True'
      }
    ],
    TemporaryPassword: Math.random().toString(36).substr(2, 6)
  }).promise();
}

function resendCode (email) {
  return CognitoISP.adminCreateUser({
    UserPoolId: process.env.AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID,
    Username: email,
    DesiredDeliveryMediums: ['EMAIL'],
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'email_verified',
        Value: 'True'
      }
    ],
    TemporaryPassword: Math.random().toString(36).substr(2, 6),
    MessageAction: 'RESEND'
  }).promise();
}

async function createOrResend (email) {
  let response = null;

  try {
    response = await createUser(email);
  } catch (error) {
    if (error.code === 'UsernameExistsException') response = await resendCode(email);
    else throw error;
  }

  return response;
}

exports.handler = async ({ arguments: { email } }) => {
  const response = await createOrResend(email);

  console.log(JSON.stringify(response, null, 2));

  return JSON.stringify({
    hello: 'test'
  });
};
