const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
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

// Query database
// db.query('SELECT * FROM departments', function (err, results) {
//     console.log(results);
// });
  
// db.query('SELECT * FROM roles', function (err, results) {
//     console.log(results);
// });
  
// db.query('SELECT * FROM employees', function (err, results) {
//     console.log(results);
//  });
  
// Default response for any other request (Not Found)
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
                console.log(typeof selection);
            })
}

init();
