'use strict';

const { Database } = require('sqlite3').verbose();

const db = new Database('example.sqlite', () => console.log('Connected!'));

db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first_name TEXT, last_name TEXT)");

const errorHandler = (err) => {
  if (err) {
    console.log(`Msg: ${err}`);
  };
};

const populateEmployees = () => {
  const list = require('./employees.json');

  list.forEach(each => {
    db.run(`INSERT INTO employees VALUES (
      ${each.id},
      "${each.first_name}",
      "${each.last_name}"
    )`, errorHandler);
  })
};
populateEmployees()

db.all("SELECT * FROM employees", (err, allRows) => {
  allRows.forEach(each => {
    console.log(each.id, each.first_name, each.last_name);
  });
});

db.close(err => {
  errorHandler(err);
  console.log('Database closed')
});
