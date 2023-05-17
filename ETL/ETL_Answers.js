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
  client.query('CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY NOT NULL, question_id INTEGER NOT NULL, body VARCHAR NOT NULL, date VARCHAR NOT NULL, answerer_name VARCHAR NOT NULL, answerer_email VARCHAR NOT NULL, REPORTED BOOLEAN NOT NULL, helpfulness INTEGER NOT NULL, FOREIGN KEY(question_id) REFERENCES questions(question_id))');

  const stream = client.query(copyFrom('COPY answers FROM STDIN CSV HEADER'));
  const fileStream = fs.createReadStream('./answers.csv');

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

