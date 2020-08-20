/** @format */

const { GraphQLClient } = require('graphql-request');

module.exports = new GraphQLClient(
  process.env.API_LEADSMANAGEMENTSYS_GRAPHQLAPIENDPOINTOUTPUT,
  {
    headers: {
      'x-api-key': process.env.API_LEADSMANAGEMENTSYS_GRAPHQLAPIKEYOUTPUT
    }
  }
);
