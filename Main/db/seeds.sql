INSERT INTO department (name)
VALUES ("Management"),
        ("Sales"),
        ("Legal"),
        ("Administration"),
        ("Research and Development"),
        ("Finance"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 70000, 1),
        ("Salesperson", 60000, 2),
        ("Lawyer", 200000, 3),
        ("Administrative Assistant", 40000, 4),
        ("Researcher", 60000, 5),
        ("Accountant", 90000, 6),
        ("Marketing Specialist", 80000, 7);

INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id)
VALUES 
    ("Michael", "Scott", 1, 1, null),
    ("Dwight", "Schrute", 2, 1, 1),
    ("Jim", "Halpert", 3, 1, 1),
    ("Pam", "Beesly", 4, 2, 1),
    ("Kevin", "Malone", 5, 5, 1),
    ("Toby", "Flenderson", 4, 4, null),
    ("Andy", "Bernard", 7, 1, 1),
    ("Erin", "Hannon", 6, 6, 1);
    