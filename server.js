
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Mitsushiro7!',
    database: 'employees_db'
  },
  console.log(`Connected to the books_db database.`)

);
db.connect(function (err, result) {
  if (err) {
    console.log(err)
  }
})

function questionsPrompt() {
  inquirer.prompt(
    {
      type: "list",
      message: "what would you like to do?",
      name: "action",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add department",
        "add role",
        "add employee",
        "update an employee role",
      ]

    }).then(answers => {
      if (answers.action == "view all departments") {
        viewAllDepartments()
      } else if (answers.action == "view all roles") {
        viewAllRoles()
      } else if (answers.action == "view all employees") {
        viewAllEmployees()
      } else if (answers.action == "add department"){
        addDepartment()
      } else if(answers.action == "add role"){
        addRole()
      } else if(answers.action == "add employee"){
        addEmployee()
      } else{
        updateEmployee()
      }
    }

    )

}
function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, result) {
    if (err) {
      console.log(err)
      return;
    }
    console.table(result)
    questionsPrompt();
  })
}
function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, result) {
    if (err) {
      console.log(err)
      return;
    }
    console.table(result)
    questionsPrompt();
  })
}

function viewAllEmployees() {
  db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `, function (err, result) {
    if (err) {
      console.log(err)
      return;
    }
    console.table(result)
    questionsPrompt();
  })
}


function addDepartment() {
  inquirer.prompt([{
    type: "input",
    message: "what is the name of the department?",
    name: "name"
  }

  ]).then(answers =>{
    db.query(`INSERT INTO department (name) VALUES ("${answers.name}")`, function (err, result) {
      if (err) {
        console.log(err)
        return;
      }
      questionsPrompt();
    })

  })
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "what is the title?",
      name: "title"
    },
    {
      type: "input",
      message: "what is the salary?",
      name: "salary"
    }
    
  ]).then(answers =>{
    db.query(`INSERT INTO role (title, salary) VALUES ("${answers.title}", "${answers.salary}")`, function (err, result) {
      if (err) {
        console.log(err)
        return;
      }
      questionsPrompt();
    })

  })
}

function addEmployee() {
  inquirer.prompt([{
    type: "input",
    message: "what is the first name of the employee?",
    name: "firstName"
  },
  {
    type: "input",
    message: "what is the last name of the employee?",
    name: "lastName"
  },
  {
    type: "input",
    message: "what is the role id of the employee?",
    name: "roleId"
  },
  {
    type: "input",
    message: "what is the department id of the employee?",
    name: "departmentID"
  },
  {
    type: "input",
    message: "what is the manager id of the employee?",
    name: "managerId"
  }


  ]).then(answers =>{
    db.query(`INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES ("${answers.firstName}", "${answers.lastName}", "${answers.roleId}", "${answers.departmentID}", "${answers.managerId}")`, function (err, result) {
      if (err) {
        console.log(err)
        return;
      }
      questionsPrompt();
    })

  })
}
function updateEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the current role ID of the employee?",
      name: "oldId"
    },
    {
      type: "input",
      message: "What is the new role ID you want your employee to go to?",
      name: "newId"
    }
  ]).then(answers => {
    db.query(
      `UPDATE employee SET role_id = ${answers.newId} WHERE role_id = ${answers.oldId}`,
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Employee's role ID updated from ${answers.oldId} to ${answers.newId}.`);
        questionsPrompt();
      }
    );
  });
}

questionsPrompt();