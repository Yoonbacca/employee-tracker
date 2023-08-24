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
        name: 'table',
        message: 'Which table would you like to access?',
        choices: ['Departments', 'Roles', 'Employees']
    },
    {   
        type: 'list',
        name: 'action',
        message: 'What would you like to add to do?',
        choices: ['View', 'Add', 'Update']
    },
    {   
        type: 'input',
        name: 'newDept',
        message: 'What is your new Department name?',
        when: (answers) => answers.table === 'Departments' && answers.action === 'Add',
    },
    {   
        type: 'input',
        name: 'newRole',
        message: 'What is your new Role name?',
        when: (answers) => answers.table === 'Roles' && answers.action === 'Add',
    },
    {   
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary for this new role?',
        when: (answers) => answers.newRole,
    },
    // {   
    //     type: 'list',
    //     name: 'roleDept',
    //     message: 'What is the department for this new role?',
    //     when: (answers) => answers.newSalary,
    //     choices: 
    // },
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
                let table = (answers.table).toLowerCase();
                let action = answers.action;

                switch (action) {
                    case 'View':
                        let sql = `SELECT * FROM ${table}`;
                        db.query(sql, function (err, results) {
                            console.table(results);
                        });
                        break;
                    case 'Add':
                        if (table === "departments") {
                            let newDept = answers.newDept;
                            let sql = `INSERT INTO ${table} (name)
                            VALUES ("${newDept}")`
                            db.query(sql, function (err, results) {
                                console.log(`Added ${newDept} to ${table}!`);
                            });
                        } else if (table === "roles") {
                            let sql = `INSERT INTO ${table} (title, salary, department_id)
                            VALUES (${newTitle},${newSalary},${newTitle})`
                            db.query(sql, function (err, results) {
                                console.log(`Added ${newDept} to ${table}!`);
                            });
                        } 
                        
                        break;
                        
                    default:
                        console.log('Not built yet');
                  }
                  console.log(action);
            })
}

init();

