/* Import faunaDB sdk */
import faunadb from 'faunadb';

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_SECRET
});

exports.handler = (event, context, callback) => {
  // const data = JSON.parse(event.body);
  // console.log('Function `fetch` invoked', event.body);
  // const userId = { data }

  /* construct the fauna query */
  return client.query(
    q.Map(
      q.Match(q.Index('pages_by_user_id'), '1'),
      q.Lambda("X", q.Get(q.Var("X")))
    ))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response.data)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
};
