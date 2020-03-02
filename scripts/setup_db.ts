/* bootstrap database in your FaunaDB account */
const faunadb = require('faunadb');
const chalk = require('chalk');
const insideNetlify = insideNetlifyBuildContext();
const q = faunadb.query;

console.log(chalk.cyan('Creating your FaunaDB Database...\n'));

// 1. Check for required enviroment variables
if (!process.env.REACT_APP_FAUNADB_SECRET) {
  console.log(chalk.yellow('Required REACT_APP_FAUNADB_SECRET enviroment variable not found.'))
  console.log(`Make sure you have created your Fauna databse with "netlify addons:create fauna"`)
  console.log(`Then run "yarn scripts" to setup your database schema`)
  if (insideNetlify) {
    process.exit(1)
  }
}

// Has var. Do the thing
if (process.env.REACT_APP_FAUNADB_SECRET) {
  createFaunaDB(process.env.REACT_APP_FAUNADB_SECRET).then(() => {
    console.log('Fauna Database schema has been created')
    console.log('Claim your fauna database with "netlify addons:auth fauna"')
  })
}

/* idempotent operation */
function createFaunaDB(key) {
  console.log('Create the fauna database schema!');
  const client = new faunadb.Client({
    secret: key
  });

  /* Based on your requirements, change the schema here */
  return client.query(q.Create(q.Ref('classes'), { name: 'pages' }))
    .then(() => {
      return client.query(q.Create(q.Ref('classes'), { name: 'users' }))
    })
    .then(() => {
      return client.query(
        q.Create(q.Ref('indexes'), {
          name: 'all_pages',
          source: q.Ref('classes/pages')
        }))
    })
    .then(() => {
      return client.query(
        q.Create(q.Ref('indexes'), {
          name: 'all_users',
          source: q.Ref('classes/users')
        }))
    })
    .then(() => {
      return client.query(
        q.Create(q.Ref('indexes'), {
          name: 'pages_by_user_id',
          source: q.Ref('classes/pages')
        }))
    })
    .catch((e) => {
      // Database already exists
      if (e.requestResult.statusCode === 400 && e.message === 'instance not unique') {
        console.log('Fauna already setup! Good to go')
        console.log('Claim your fauna database with "netlify addons:auth fauna"')
        throw e
      }
    });
}

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}
