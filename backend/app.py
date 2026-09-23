from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "placemate.db"


# ==============================
# Database Connection
# ==============================

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# ==============================
# Create Database
# ==============================

def init_db():

    conn = get_db()

    # Students
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'Student',
            branch TEXT DEFAULT 'BCA',
            semester TEXT DEFAULT '5th'
        )
    """)

    # Companies
    conn.execute("""
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            package TEXT,
            location TEXT
        )
    """)

    # Applications
    conn.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_email TEXT NOT NULL,
            company TEXT NOT NULL,
            status TEXT DEFAULT 'Applied'
        )
    """)

    conn.commit()
    conn.close()


# ==============================
# Home
# ==============================

@app.route("/")
def home():

    return jsonify({
        "project": "PlaceMate",
        "message": "PlaceMate Backend is Running",
        "database": "SQLite",
        "status": "success"
    })


# ==============================
# Register
# ==============================

@app.route("/api/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:

        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

    try:

        conn = get_db()

        conn.execute("""
            INSERT INTO students
            (name, email, password)
            VALUES (?, ?, ?)
        """, (
            name,
            email,
            password
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Registration successful"
        })

    except sqlite3.IntegrityError:

        return jsonify({
            "success": False,
            "message": "Email already registered"
        }), 400


# ==============================
# Login
# ==============================

@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    conn = get_db()

    student = conn.execute("""
        SELECT *
        FROM students
        WHERE email = ?
        AND password = ?
    """, (
        email,
        password
    )).fetchone()

    conn.close()

    if not student:

        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "success": True,
        "message": "Login successful",
        "student": {
            "id": student["id"],
            "name": student["name"],
            "email": student["email"],
            "role": student["role"],
            "branch": student["branch"],
            "semester": student["semester"]
        }
    })


# ==============================
# Get Students
# ==============================

@app.route("/api/students")
def students():

    conn = get_db()

    data = conn.execute("""
        SELECT id, name, email, role, branch, semester
        FROM students
    """).fetchall()

    conn.close()

    return jsonify([
        dict(student)
        for student in data
    ])


# ==============================
# Add Company
# ==============================

@app.route("/api/companies", methods=["POST"])
def add_company():

    data = request.json

    conn = get_db()

    conn.execute("""
        INSERT INTO companies
        (name, package, location)
        VALUES (?, ?, ?)
    """, (
        data.get("name"),
        data.get("package"),
        data.get("location")
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Company added successfully"
    })


# ==============================
# Get Companies
# ==============================

@app.route("/api/companies")
def companies():

    conn = get_db()

    data = conn.execute("""
        SELECT *
        FROM companies
    """).fetchall()

    conn.close()

    return jsonify([
        dict(company)
        for company in data
    ])


# ==============================
# Apply for Company
# ==============================

@app.route("/api/apply", methods=["POST"])
def apply():

    data = request.json

    email = data.get("email")
    company = data.get("company")

    conn = get_db()

    conn.execute("""
        INSERT INTO applications
        (student_email, company)
        VALUES (?, ?)
    """, (
        email,
        company
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Application submitted successfully"
    })


# ==============================
# Get Applications
# ==============================

@app.route("/api/applications")
def applications():

    conn = get_db()

    data = conn.execute("""
        SELECT *
        FROM applications
    """).fetchall()

    conn.close()

    return jsonify([
        dict(application)
        for application in data
    ])


# ==============================
# Start Server
# ==============================

if __name__ == "__main__":

    init_db()

    app.run(
        debug=True,
        port=5000
    )