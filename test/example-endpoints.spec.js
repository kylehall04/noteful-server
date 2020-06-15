const knex = require('knex');
const app = require('../src/app');

const __fixturesHere__ = [];

describe('Some endpoints', () => {
  let db;
  
  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });

    app.set('db', db);
  });

  const cleanDb = () => db.raw('TRUNCATE _valid_table_goes_here_ RESTART IDENTITY CASCADE;');
  before('clean db', cleanDb);
  afterEach('clean db', cleanDb);
  after('end conn', () => db.destroy());

  describe('First test set', () => {
    it.skip('Write test');
  });
});