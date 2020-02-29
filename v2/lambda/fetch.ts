/* Import faunaDB sdk */
const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_SECRET
});

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body)
    console.log('Function `create` invoked', data)

    /* construct the fauna query */
    return client.query(q.Get(q.Ref('classes/pages')))
      .then((response) => {
        console.log('success', response)
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        }
      }).catch((error) => {
        console.log('error', error)
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        }
      })
};