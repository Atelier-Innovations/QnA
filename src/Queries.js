const pg = require('pg');
const { Pool } = pg;
// const Pool  = pg.Pool;

const pool = new Pool({
  host: 'localhost',
  database: 'sdc',
  user: 'newuser',
  password: process.env.dbPW,
  port: Number(process.env.PORT)
})

exports.GetQuestions = (prod_id, page, count) => {
  return new Promise((resolve, reject) => {

    page = page || 1;
    count = count || 5;
    pool.connect((err , client , release) => {
      if (err) {
        console.log('error acquiring client', err)
      }
        //query to get all answers to all questions for a specific product
        //THE INNERJOIN TABLE WAS PREVIOUS CREATED BY CREATE TABLE --INNERJOINNAME-- AS --INNERJOINQUERY--
        // client.query(`SELECT answers.question_id, answers.id, answers.body, answers.date, answers.answerer_name, answers.reported, answers.helpfulness FROM questions INNER JOIN answers ON questions.question_id = answers.question_id AND questions.product_id=${prod_id} ORDER BY questions.question_id ASC`, (err, query1) => {
          client.query(`SELECT * FROM questionsandanswers WHERE product_id=${prod_id}`, (err, query1) => {
            if (err) {
              throw err;
            }
            //Query to get table for specific product, which has columns of answers id and url for photos
            // client.query(`SELECT questions.product_id, answers.id, photos.url from questions INNER JOIN answers ON questions.question_id=answers.question_id INNER JOIN photos ON answers.id=photos.id WHERE product_id=${prod_id}`, (err, query2) => {
              // client.query(`SELECT questions.product_id, answers.question_id, answers.id, photos.url from questions INNER JOIN answers ON questions.question_id=answers.question_id INNER JOIN photos ON answers.id=photos.id`, (err, query2) => {
              client.query(`select * from photourls where product_id=${prod_id}`, (err, query2) => {
                if (err) {
                  throw err;
                }
                // query to get all questions for a specific product
                //SELECT * FROM questions WHERE product_id=1 LIMIT 5;
                client.query(`SELECT * FROM questions WHERE product_id=${prod_id} LIMIT ${count}`, (err, query3) => {
                  if (err) {
                    throw err;
                  }
                  //create the actual data storage object
                  var data = {
                    product_id: prod_id,
                    results: []
                  }
                  //iterate through the questions, add each questions to the results array
                  for (var i=0; i<query3.rows.length; i++) {
                    var date = new Date(Number(query3.rows[i].question_date));
                    const dateString = date.toISOString();
                    currentQuestion =
                    {
                      question_id: query3.rows[i].question_id,
                      question_body: query3.rows[i].question_body,
                      question_date: dateString,
                      asker_name: query3.rows[i].asker_name,
                      helpfulness: query3.rows[i].question_helpfulness,
                      answers: {}

                    }
                    //iterate through all of the answers, if the answers question_id matches the current question's question_id, insert a new key value pair where the key is the answer_id and the value is an obj consisting of the answer data.
                    for (var j=0; j<query1.rows.length; j++) {
                      if (query1.rows[j].question_id === query3.rows[i].question_id) {
                        let newKey = query1.rows[j].id;
                        var dateForAnswers = new Date(Number(query1.rows[j].date));
                        var dateStringForAnswers = dateForAnswers.toISOString();
                        currentQuestion.answers[newKey] = {
                          id: query1.rows[j].id,
                          body: query1.rows[j].body,
                          date: dateStringForAnswers,
                          answerer_name: query1.rows[j].answerer_name,
                          helpfulness: query1.rows[j].helpfulness,
                          photos: []
                        }
                        //for each answer that is found, iterate through the photos list and if the current answer's answer_id = the photos answer_id, push the photoObj into the answer's photo array.
                        for (var k=0; k<query2.rows.length; k++) {
                          if (query2.rows[k].id === query1.rows[j].id) {
                            let photoObj = {
                              id: query2.rows[k].id,
                              url: query2.rows[k].url
                            }
                            currentQuestion.answers[newKey].photos.push(photoObj);
                          }
                        }
                      }
                    }
                    data.results.push(currentQuestion);
                  }


                  //iterate through the length of the questions array, create an object for each question and push it to a questions array;
                  // for (var i=0; i<results.rows.length; i++) {

                    //   let currentQuestion =


                    //     questionsArray.push(currentQuestion)


                    //   }


                    // let actualResponse = {
                      //   product_id: prod_id,
                      //   results: questionsArray
                      // }
                      // console.log(questionsArray);
                      if (err) {
                        reject(err);
                     }
                     else { resolve(data);
                     }
                    });
                  });
                });


              })
            })
}

exports.GetAnswers = (question_id, page, count) => {
  return new Promise((resolve, reject) => {
    console.log('inside da func')
    page = page || 0;
    count = count || 5;
    pool.connect((err, client, release) => {
      if (err) {
        console.log(err);
      }
      client.query(`SELECT * FROM answers WHERE question_id=${question_id} LIMIT ${count}`, (err, answers) => {
        if (err) {
          console.log(err);
        }
        client.query(`SELECT * FROM photosandquestions WHERE question_id=${question_id}`, (err, photos) => {

          data = {
            question: question_id,
            page: page,
            count: count,
            results: []
          }
          console.log(data);
          for (var i=0; i<answers.rows.length; i++) {
            var dateForAnswers = new Date(Number(answers.rows[i].date));
            var dateStringForAnswers = dateForAnswers.toISOString();

            let answerBody = {
              answer_id: answers.rows[i].id,
              body: answers.rows[i].body,
              date: dateStringForAnswers,
              answerer_name: answers.rows[i].answerer_name,
              helpfulness: answers.rows[i].helpfulness,
              photos: []
            }

            if (photos) {
              console.log('in here')
                for (var j=0; j<photos.rows.length; j++) {
                    if (photos.rows[j].id === answers.rows[i].id) {
                    let photosObj = {
                      id: photos.rows[j].id,
                      url: photos.rows[j].url
                    }
                    answerBody.photos.push(photosObj);
                  }
                  }
                }

              data.results.push(answerBody);

          }
          console.log(data);
          if (err) {
            reject(err);
          }
          else { resolve(data);
          }
        })
      })

    })
  })

}

//DOESN'T WORK- CAN'T FIGURE IT OUT --- SYNTAX ERROR AT OR NEAR "T21"...
exports.SubmitAnswer = (body, name, email, prod_id) => {
  return new Promise((resolve, reject) => {
    console.log('inside da func');
    console.log(Date.now());
    var date = new Date(Number(Date.now()));
    const dateString = date.toISOString();
    pool.connect((err, client, release) => {
      if (err) {
        console.log(err);
      }
      client.query(`INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES (${prod_id}, ${body}, ${dateString} ${name}, ${email}, f, 0)`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve('successfully added question to the database');
        }
      })
    })
  })
}