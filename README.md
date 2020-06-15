# Express Boilerplate with DB

## Set up

1. `npm install`
2. Rename `example.env` to `.env` and add secrets as needed
    - Must include `DB_URL` and `TEST_DB_URL` 
3. Edit `package.json` project name
4. Reset git: `rm -rf .git && git init && git add -A && git commit -m 'start'`

## Usage

* `npm run dev` - run with Nodemon
* `npm test` - Mocha default
* `npm test -- -w` - Mocha in watch mode
* `npm run deploy` - pushes to Heroku master
* `npm run migrate` - runs Postgrator migrations on dev db
* `npm run migrate:test` - runs Postgrator migrations on test db
