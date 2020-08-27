const { GraphQLClient, gql } = require('graphql-request');

const graphqlClient = new GraphQLClient(
  process.env.API_LEADSMANAGEMENTSYS_GRAPHQLAPIENDPOINTOUTPUT,
  {
    headers: {
      'x-api-key': process.env.API_LEADSMANAGEMENTSYS_GRAPHQLAPIKEYOUTPUT
    }
  }
);

module.exports.graphqlClient = graphqlClient;
module.exports.gql = gql;
