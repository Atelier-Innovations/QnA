import dotenv from 'dotenv';
dotenv.config();''
import * as pg from 'pg';
import * as papa from 'papaparse';
const { Pool } = pg;
import fs from 'fs';
import * as copy from 'pg-copy-streams';
const copyFrom = copy.from;
import express, { Application, Request, Response, } from 'express';

const app = express();
app.use(express.json);



// const PORT: number = 3001;

app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.listen(3000, (): void => {
    console.log('SERVER IS UP ON PORT:', 3000);
});

const pool = new Pool({
    host: 'localhost',
    database: 'sdc',
    user: 'newuser',
    password: process.env.dbPW,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 20000,
    port: Number(process.env.PORT)
})


pool.connect((err, client, release) => {
    if (err) {
        return console.log('error acquiring client', err)
    }
    console.log('making it into the pool connect function', client);
    client.query('CREATE TABLE questions')
    .then(() => {
        console.log('in the then block');
//     const stream = client.query(copyFrom('COPY questions FROM STDIN CSV HEADER'));
//     const fileStream = fs.createReadStream('./questions.csv');
//     // const parsedStream = papa.parse(papa.NODE_STREAM_INPUT, {header: true});
//     parsedStream.on('data', (data) => {
//         console.log(data);
//     })
//     fileStream.on('error', release);
//     // stream.on('error', release);
//     console.log('started stream');
//     // stream.on('finish', release);
//     fileStream.pipe(parsedStream).on('finish', release);
})
    // const stream = client.query(copyFrom('COPY questions FROM STDIN CSV HEADER'));
    // const fileStream = fs.createReadStream('./questions.csv');
    // fileStream.on('error', release);
    // stream.on('error', release);
    // console.log('started stream');
    // stream.on('finish', release);
    // fileStream.pipe(stream).on('finish', release).on('error', release);

})
//(question_id INTEGER NOT NULL, product_id INTEGER NOT NULL, question_body VARCHAR NOT NULL, question_date VARCHAR NOT NULL, asker_name VARCHAR NOT NULL, asker_email VARCHAR NOT NULL, reported BOOLEAN NOT NULL, question_helpfulness INTEGER NOT NULL'