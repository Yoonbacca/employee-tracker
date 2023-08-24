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
    },
    {   
        type: 'input',
        name: 'empFirstName',
        message: "What is the your new employee's first name?",
        when: (answers) => answers.choice === 'Add Employee',
    },
    {   
        type: 'input',
        name: 'empFirstName',
        message: "What is the your new employee's first name?",
        when: (answers) => answers.choice === 'Add Employee',
    },
    {   
        type: 'input',
        name: 'empLastName',
        message: "What is the your new employee's last name?",
        when: (answers) => answers.empFirstName !== undefined,
    },
    {   
        type: 'list',
        name: 'empRole',
        message: "What is the your new employee's role?",
        when: (answers) => answers.empLastName !== undefined,
        choices: function () {
            return pullRoles()
        }
    },
    {   
        type: 'list',
        name: 'empManager',
        message: "Who is their manager?",
        when: (answers) => answers.empLastName !== undefined,
        choices: function () {
            return pullManagers()
        }
    },
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

function pullRoles() {
    return new Promise((resolve,reject) => {
        db.query('SELECT id, title FROM roles WHERE id != 1', function (err, results) {
            if (err) {
                reject(err);
            } else {
                const choices = results.map((role) => ({
                    value: role.id,
                    name: role.title,
                }));
                resolve(choices);
            }
        });
    });           
}

function pullManagers() {
    return new Promise((resolve,reject) => {
        db.query('SELECT id, first_name, last_name FROM employees WHERE role_id <= 2', function (err, results) {
            if (err) {
                reject(err);
            } else {
                const choices = results.map((emp) => ({
                    value: emp.id,
                    name: emp.first_name + " " + emp.last_name,
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

Welcome to Employee Tracker! Please follow the prompts below:
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
                        sql = `INSERT INTO roles (title, salary, department_id)
                        VALUES ("${roleTitle}", ${roleSalary}, ${roleDept});`;
                        db.query(sql, function (err, results) {
                            console.log(`Added ${roleTitle} to the Roles Table!`);
                        });
                        break;
                    case 'Add Employee':
                        let empFirstName = answers.empFirstName;
                        let empLastName = answers.empLastName;
                        let empRole = answers.empRole;
                        let empManager = answers.empManager;

                        console.log(empFirstName,empLastName,empRole,empManager);
                        sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                        VALUES ("${empFirstName}", "${empLastName}", ${empRole}, ${empManager});`;
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

