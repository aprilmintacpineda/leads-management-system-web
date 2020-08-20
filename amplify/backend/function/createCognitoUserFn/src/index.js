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

exports.handler = async event => {
  console.log(JSON.stringify(process.env, null, 2));
  console.log(JSON.stringify(event, null, 2));

  return JSON.stringify({
    hello: 'test'
  });
};
