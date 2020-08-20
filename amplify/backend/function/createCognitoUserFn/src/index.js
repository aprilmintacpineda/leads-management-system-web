/** @format */

exports.handler = async event => {
  console.log(JSON.stringify(process.env, null, 2));
  console.log(JSON.stringify(event, null, 2));

  return JSON.stringify({
    hello: 'test'
  });
};
