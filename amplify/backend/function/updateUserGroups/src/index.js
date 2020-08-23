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
  arguments: { groups: newGroups, id },
  identity: { groups: requestorGroups }
}) => {
  if (!requestorGroups.includes('Admin')) throw new Error('Unauthorized');

  const poolId = process.env.AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID;

  let { Groups: oldGroups } = await CognitoISP.adminListGroupsForUser({
    UserPoolId: poolId,
    Username: id
  }).promise();

  oldGroups = oldGroups.reduce(
    (accumulator, { GroupName }) => accumulator.concat(GroupName),
    []
  );

  await Promise.all(
    [].concat(
      // adding user to new groups
      newGroups.map(group => {
        if (oldGroups.includes(group)) return null;

        return CognitoISP.adminAddUserToGroup({
          UserPoolId: poolId,
          Username: id,
          GroupName: group
        }).promise();
      }),
      // removing user from groups
      oldGroups.map(group => {
        if (newGroups.includes(group)) return null;

        return CognitoISP.adminRemoveUserFromGroup({
          UserPoolId: poolId,
          Username: id,
          GroupName: group
        }).promise();
      })
    )
  );

  return { status: 'success' };
};
