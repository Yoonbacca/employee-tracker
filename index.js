const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select your Option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
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
