const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '$6NBsWTh@Ka$kG',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

// Query database

  


  
// Default response for any other request (Not Found)

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select your Option:',
        choices: ['View All Departments', 
        'View All Roles', 
        'View All Employees', 
        new inquirer.Separator(),
        'Add A Department', 
        'Add a Role', 
        'Add an Employee', 
        new inquirer.Separator(),
        'Update an Employee Role',
        new inquirer.Separator()]
    },
];

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

function init() {
    console.log('Welcome to Employee Tracker! Please follow the prompts below');
    inquirer.prompt(questions)
            .then((answers) => {
                let selection = Object.values(answers).toString();
                switch (selection) {
                    case 'View All Departments':
                        db.query('SELECT * FROM departments', function (err, results) {
                            console.table(results);
                        });
                        break;
                    case 'View All Roles':
                        db.query('SELECT * FROM roles', function (err, results) {
                            console.table(results);
                        });
                        break;
                    case 'View All Employees':
                        db.query('SELECT * FROM employees', function (err, results) {
                            console.table(results);
                         });
                        break;
                    default:
                        console.log('Not built yet');
                  }
                  
            })
}

init();
