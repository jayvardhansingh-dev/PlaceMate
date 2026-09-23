import sqlite3

DATABASE = "placemate.db"

conn = sqlite3.connect(DATABASE)

students = [

    (
        "Jayvardhan Singh",
        "jayvardhantech.py@gmail.com",
        "1001",
        "Team Leader",
        "BCA",
        "5th"
    ),

    (
        "Uzair",
        "mohammeduzair483@gmail.com",
        "uzair123",
        "Backend Developer",
        "BCA",
        "5th"
    ),

    (
        "Utsav Saraswat",
        "saraswatutsav13@gmail.com",
        "utsav123",
        "Database Manager",
        "BCA",
        "5th"
    ),

    (
        "Aakash Yadav",
        "aakashy24-bca@sanskar.org",
        "aakash123",
        "Testing & Documentation",
        "BCA",
        "5th"
    )

]

for student in students:

    try:

        conn.execute("""
            INSERT INTO students
            (name, email, password, role, branch, semester)
            VALUES (?, ?, ?, ?, ?, ?)
        """, student)

    except sqlite3.IntegrityError:

        print(student[1], "already exists")


conn.commit()
conn.close()

print("Students added successfully!")