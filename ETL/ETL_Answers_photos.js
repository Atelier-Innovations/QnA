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
  client.query('CREATE TABLE IF NOT EXISTS photos (index INTEGER NOT NULL, id INTEGER NOT NULL, url VARCHAR NOT NULL, FOREIGN KEY(id) REFERENCES answers(id))');

  const stream = client.query(copyFrom('COPY photos FROM STDIN CSV HEADER'));
  const fileStream = fs.createReadStream('./answers_photos.csv');

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