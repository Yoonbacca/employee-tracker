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

const questions = [
    {   
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all Departments', 
                'View all Roles', 
                'View all Employees',
                'Add Department',
                'Add Role', 
                'Add Employee', 
                'Update an Employee Role'],
        default: 'View all Departments',
    },
    {   
        type: 'input',
        name: 'deptName',
        message: 'What is your new Department name?',
        when: (answers) => answers.choice === 'Add Department',
    },
    {   
        type: 'input',
        name: 'roleTitle',
        message: 'What is your new Role title?',
        when: (answers) => answers.choice === 'Add Role',
    },
    {   
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this new role?',
        when: (answers) => answers.roleTitle !== undefined,
    },
    {   
        type: 'list',
        name: 'roleDept',
        message: 'What is the department for this new role?',
        when: (answers) => answers.roleSalary !== undefined,
        choices: function () {
            return pullDepts()
        }
    }
];

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

function pullDepts() {
    return new Promise((resolve,reject) => {
        db.query('SELECT id, name FROM departments', function (err, results) {
            if (err) {
                reject(err);
            } else {
                const choices = results.map((dept) => ({
                    value: dept.id,
                    name: dept.name,
                }));
                resolve(choices);
            }
        });
    });           
}

function init() {
    console.log(`+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|E M P L O Y E E   T R A C K E R|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Welcome to your Employee Tracker! Please follow the prompts below:
------------------------------------------------------------------`);
    inquirer.prompt(questions)
            .then((answers) => {
                let choice = answers.choice;
                let sql = "";
                console.log(choice)
                switch (choice) {
                    case 'View all Departments':
                        sql = 'SELECT * FROM departments';
                        db.query(sql, function (err, results) {
                            console.table(results);
                        });
                        break;
                    case 'View all Roles':
                        sql = 'SELECT * FROM roles';
                        db.query(sql, function (err, results) {
                            console.table(results);
                        });
                        break;
                    case 'View all Employees':
                        sql = 'SELECT * FROM employees'
                        db.query(sql, function (err, results) {
                            console.table(results);
                        });
                        break;
                    case 'Add Department':
                        let deptName = answers.deptName;
                        sql = `INSERT INTO departments (name)
                        VALUES ("${deptName}");`;
                        db.query(sql, function (err, results) {
                            console.log(`Added ${deptName} to the Departments Table!`);
                        });
                        break;
                    case 'Add Role':
                        let roleTitle = answers.roleTitle;
                        let roleSalary = answers.roleSalary;
                        let roleDept = answers.roleDept;
                        console.log(roleTitle,roleSalary,roleDept);
                        sql = `INSERT INTO roles (title, salary, department_id)
                        VALUES ("${roleTitle}", ${roleSalary}, ${roleDept});`;
                        db.query(sql, function (err, results) {
                            console.log(`Added ${roleTitle} to the Roles Table!`);
                        });
                        break;
                    default:
                        console.log('Not built yet');
                  }
            })
}

init();

