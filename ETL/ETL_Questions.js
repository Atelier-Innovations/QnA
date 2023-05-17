const pg = require('pg');
const { Pool } = pg;
const fs = require('fs');
const copy = require('pg-copy-streams');
const copyFrom = copy.from;

const pool = new Pool({
    host: 'localhost',
    database: 'sdc',
    user: 'newuser',
    password: process.env.dbPW,
    port: Number(process.env.PORT)
})

pool.connect((err , client , release) => {
  if (err) {
      console.log('error acquiring client', err)
  }
  client.query('CREATE TABLE IF NOT EXISTS questions (question_id INTEGER PRIMARY KEY NOT NULL, product_id INTEGER NOT NULL, question_body VARCHAR NOT NULL, question_date VARCHAR NOT NULL, asker_name VARCHAR NOT NULL, asker_email VARCHAR NOT NULL, reported BOOLEAN NOT NULL, question_helpfulness INTEGER NOT NULL)');

  const stream = client.query(copyFrom('COPY questions FROM STDIN CSV HEADER'));
  const fileStream = fs.createReadStream('./questions.csv');

  fileStream.on('error', (err) => {
      console.log('error,', err)
  });
  stream.on('error', (err) => {
      console.log('error,', err)
  });
  console.log('started stream');
  stream.on('finish', () => {
      console.log('finish')
  });
  fileStream.pipe(stream).on('finish', release);


})