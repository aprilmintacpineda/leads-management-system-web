/* Amplify Params - DO NOT EDIT
	API_LEADSMANAGEMENTSYS_GRAPHQLAPIENDPOINTOUTPUT
	API_LEADSMANAGEMENTSYS_GRAPHQLAPIIDOUTPUT
	API_LEADSMANAGEMENTSYS_GRAPHQLAPIKEYOUTPUT
	API_LEADSMANAGEMENTSYS_USERTABLE_ARN
	API_LEADSMANAGEMENTSYS_USERTABLE_NAME
	AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID
	ENV
	REGION
	STORAGE_S3453D1BD4_BUCKETNAME
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');

const CognitoISP = new aws.CognitoIdentityServiceProvider();

exports.handler = async ({
  arguments: { email, groups },
  identity: { groups: requestorGroups }
}) => {
  if (!requestorGroups || !requestorGroups.includes('Admin'))
    throw new Error('Unauthorized');

  const poolId = process.env.AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID;

  const response = await CognitoISP.adminCreateUser({
    UserPoolId: poolId,
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

  if (groups && groups.length) {
    await Promise.all(
      groups.map(group =>
        CognitoISP.adminAddUserToGroup({
          UserPoolId: poolId,
          GroupName: group,
          Username: response.User.Username
        }).promise()
      )
    );
  }

  return response;
};
