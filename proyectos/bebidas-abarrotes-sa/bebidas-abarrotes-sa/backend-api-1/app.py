

from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import time

app = Flask(__name__)
CORS(app)

db = None

while True:

    try:

        db = mysql.connector.connect(
            host="mysql",
            user="admin",
            password="admin123",
            database="empresa"
        )

        print("MYSQL CONECTADO BACKEND 2")

        break

    except Exception as e:

        print("Esperando MySQL...")
        print(e)

        time.sleep(5)

cursor = db.cursor(dictionary=True)

@app.route("/")

def home():

    return jsonify({
        "mensaje": "Backend API 2 funcionando"
    })

@app.route("/reportes")

def reportes():

    cursor.execute("SELECT * FROM ventas")

    ventas = cursor.fetchall()

    return jsonify({
        "total_registros": len(ventas),
        "ventas": ventas
    })

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000
    )
    