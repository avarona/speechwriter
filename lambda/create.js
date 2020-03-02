/* Import faunaDB sdk */
import faunadb from 'faunadb';

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET
});

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log('Function `create` invoked', data)
  const page = { data }

  /* construct the fauna query */
  return client.query(q.Create(q.Ref('classes/pages'), page))
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