from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "placemate.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_email TEXT,
            company TEXT,
            status TEXT DEFAULT 'Applied'
        )
    """)

    conn.commit()
    conn.close()


@app.route("/")
def home():
    return jsonify({
        "message": "PlaceMate Backend is Running",
        "status": "success"
    })


@app.route("/api/register", methods=["POST"])
def register():

    data = request.json

    try:

        conn = get_db()

        conn.execute("""
            INSERT INTO students
            (name, email, password)
            VALUES (?, ?, ?)
        """, (
            data["name"],
            data["email"],
            data["password"]
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "message": "Registration successful"
        }), 201

    except sqlite3.IntegrityError:

        return jsonify({
            "message": "Email already registered"
        }), 400


@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    conn = get_db()

    student = conn.execute("""
        SELECT * FROM students
        WHERE email = ? AND password = ?
    """, (
        data["email"],
        data["password"]
    )).fetchone()

    conn.close()

    if student:

        return jsonify({
            "success": True,
            "student": {
                "id": student["id"],
                "name": student["name"],
                "email": student["email"]
            }
        })

    return jsonify({
        "success": False,
        "message": "Invalid email or password"
    }), 401


@app.route("/api/students")
def students():

    conn = get_db()

    students = conn.execute(
        "SELECT id, name, email FROM students"
    ).fetchall()

    conn.close()

    return jsonify([
        dict(student)
        for student in students
    ])


@app.route("/api/apply", methods=["POST"])
def apply():

    data = request.json

    conn = get_db()

    conn.execute("""
        INSERT INTO applications
        (student_email, company)
        VALUES (?, ?)
    """, (
        data["email"],
        data["company"]
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Application submitted successfully"
    })


@app.route("/api/applications")
def applications():

    conn = get_db()

    applications = conn.execute(
        "SELECT * FROM applications"
    ).fetchall()

    conn.close()

    return jsonify([
        dict(application)
        for application in applications
    ])


if __name__ == "__main__":

    init_db()

    app.run(
        debug=True,
        port=5000
    )