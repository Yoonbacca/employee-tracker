INSERT INTO departments (id, name)
VALUES (1,"Leadership"),
       (2,"Billing"),
       (3,"Human Resources"),
       (4,"Sales"),
       (5,"Support"),
       (6,"Engineering");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "CEO", 100000000, 1),
       (2, "Manager", 120000, 1),
       (3, "Billing Specialist", 70000, 2),
       (4, "Recruiter", 80000, 3),
       (5, "Sales Representative", 60000, 4),
       (6, "Support Specialist", 50000, 5),
       (7, "Frontend Engineer", 100000, 6),
       (8, "Backend Engineer", 100000, 6);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (01, "Edward", "Elite", 1, 01),
       (02, "Molly", "Manager", 2, 01),
       (03, "Matt", "Manager", 2, 01),
       (04, "Morgan", "Manager", 2, 01),
       (05, "Marge", "Manager", 2, 01),
       (06, "Mandy", "Manager", 2, 01),
       (07, "Max", "Manager", 2, 01),
       (08, "Billy", "Bills", 3, 02),
       (09, "Rhonda", "Recruiter", 4, 03),
       (10, "Sally", "Seller", 5, 04),
       (11, "Sonny", "Supporter", 6, 05),
       (12, "Frankie", "Frontend", 7, 06),
       (13, "Brady", "Backend", 8, 07);

