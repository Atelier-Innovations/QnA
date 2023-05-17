require("dotenv").config();
const {GetQuestions, GetAnswers, SubmitAnswer} = require('./Queries.js')
const pg = require('pg');
const { Pool } = pg;
const fs = require('fs');
const copy = require('pg-copy-streams');
const copyFrom = copy.from;
const express = require('express');

const app = express();
app.use(express.json());



// const PORT: number = 3001;
app.get('/', (req, res) => {
    res.send('yoooo');
})


app.get('/qa/questions', (req, res) => {
    console.log(req.query.product_id);
    GetQuestions(req.query.product_id, req.query.page, req.query.count)
    .then((data) => {
        console.log('success!', data)
        res.status(200).send(data);

    })
    .catch ((err) => {
        console.log(err);
        res.status(400).send('failed');
  })

})

app.get('/qa/questions/:question_id/answers', (req, res) => {
    console.log('receiving get request for answers');
    console.log(req.params);
    GetAnswers(req.params.question_id, req.query.page, req.query.count)
    .then((data) => {
        console.log('sucess!', data)
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send('failed');
    })
})

app.post('/qa/questions', (req, res) => {
    SubmitAnswer(req.query.body, req.query.name, req.query.email, req.query.product_id)
    .then((confirmation) => {
        res.status(200).send(confirmation);
    })
    .catch ((err) => {
        console.log(err);
        res.status(400).send('failed');
    })
})



app.listen(3000, ()=> {
    console.log('SERVER IS UP ON PORT:', 3000);
});

// const pool = new Pool({
//     host: 'localhost',
//     database: 'sdc',
//     user: 'newuser',
//     password: process.env.dbPW,
//     port: Number(process.env.PORT)
// })

//CREATE QUESTIONS TABLE AND STREAM DATA FROM CSV
// pool.connect((err , client , release) => {
//     if (err) {
//         console.log('error acquiring client', err)
//     }
//     client.query('CREATE TABLE IF NOT EXISTS questions (question_id INTEGER NOT NULL, product_id INTEGER NOT NULL, question_body VARCHAR NOT NULL, question_date VARCHAR NOT NULL, asker_name VARCHAR NOT NULL, asker_email VARCHAR NOT NULL, reported BOOLEAN NOT NULL, question_helpfulness INTEGER NOT NULL)');

//     const stream = client.query(copyFrom('COPY questions FROM STDIN CSV HEADER'));
//     const fileStream = fs.createReadStream('./questions.csv');

//     fileStream.on('error', (err) => {
//         console.log('u suck,', err)
//     });
//     stream.on('error', (err) => {
//         console.log('u suck,', err)
//     });
//     console.log('started stream');
//     stream.on('finish', () => {
//         console.log('finish')
//     });
//     fileStream.pipe(stream).on('finish', release);


// })
//CREATE ANSWERS TABLE AND STREAM DATA FROM CSV
// pool.connect((err , client , release) => {
//     if (err) {
//         console.log('error acquiring client', err)
//     }
//     client.query('CREATE TABLE IF NOT EXISTS answers (id INTEGER NOT NULL, question_id INTEGER NOT NULL, body VARCHAR NOT NULL, date VARCHAR NOT NULL, answerer_name VARCHAR NOT NULL, answerer_email VARCHAR NOT NULL, REPORTED BOOLEAN NOT NULL, helpfulness INTEGER NOT NULL)');

//     const stream = client.query(copyFrom('COPY answers FROM STDIN CSV HEADER'));
//     const fileStream = fs.createReadStream('./answers.csv');

//     fileStream.on('error', (err) => {
//         console.log('u suck,', err)
//     });
//     stream.on('error', (err) => {
//         console.log('u suck,', err)
//     });
//     console.log('started stream');
//     stream.on('finish', () => {
//         console.log('finish')
//     });
//     fileStream.pipe(stream).on('finish', release);

// })
//CREATE PHOTOS TABLE AND STREAM DATA FROM CSV
// pool.connect((err , client , release) => {
//     if (err) {
//         console.log('error acquiring client', err)
//     }
//     client.query('CREATE TABLE IF NOT EXISTS photos (index INTEGER NOT NULL, id INTEGER NOT NULL, url VARCHAR NOT NULL)');

//     const stream = client.query(copyFrom('COPY photos FROM STDIN CSV HEADER'));
//     const fileStream = fs.createReadStream('./answers_photos.csv');

//     fileStream.on('error', (err) => {
//         console.log('u suck,', err)
//     });
//     stream.on('error', (err) => {
//         console.log('u suck,', err)
//     });
//     console.log('started stream');
//     stream.on('finish', () => {
//         console.log('finish')
//     });
//     fileStream.pipe(stream).on('finish', release);

// })`
//(question_id INTEGER NOT NULL, product_id INTEGER NOT NULL, question_body VARCHAR NOT NULL, question_date VARCHAR NOT NULL, asker_name VARCHAR NOT NULL, asker_email VARCHAR NOT NULL, reported BOOLEAN NOT NULL, question_helpfulness INTEGER NOT NULL'