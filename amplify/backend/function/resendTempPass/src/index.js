/**
 * /* Amplify Params - DO NOT EDIT
 *   API_LEADSMANAGEMENTSYS_GRAPHQLAPIENDPOINTOUTPUT
 *   API_LEADSMANAGEMENTSYS_GRAPHQLAPIIDOUTPUT
 *   API_LEADSMANAGEMENTSYS_GRAPHQLAPIKEYOUTPUT
 *   API_LEADSMANAGEMENTSYS_USERTABLE_ARN
 *   API_LEADSMANAGEMENTSYS_USERTABLE_NAME
 *   AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID
 *   STORAGE_S3453D1BD4_BUCKETNAME
 * Amplify Params - DO NOT EDIT
 *
 * @format
 */

const aws = require('aws-sdk');

const CognitoISP = new aws.CognitoIdentityServiceProvider();

exports.handler = async ({ arguments: { email } }) => {
  const response = CognitoISP.adminCreateUser({
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

  return response;
};
