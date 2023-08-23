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

// Query database
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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


function writeToFile(data) { 

    fs.writeFile('./assets/README.md', data, (err) =>
    err ? console.error(err) : console.log('Success! Check the assets folder for your new file!')
    );
}

function init() {
    console.log('Welcome to Employee Tracker! Please follow the prompts below');
    inquirer.prompt(questions).then((answers) => {
        console.log("Thank you!");
    })
}

init();
