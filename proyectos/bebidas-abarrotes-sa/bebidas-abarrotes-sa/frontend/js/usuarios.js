

from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import time

app = Flask(__name__)
CORS(app)

# =========================================
# ESPERAR MYSQL
# =========================================

db = None

while True:

    try:

        db = mysql.connector.connect(
            host="mysql",
            user="admin",
            password="admin123",
            database="empresa"
        )

        print("MYSQL CONECTADO BACKEND 1")

        break

    except Exception as e:

        print("Esperando MySQL...")
        print(e)

        time.sleep(5)

cursor = db.cursor(dictionary=True)

# =========================================
# RUTA PRINCIPAL
# =========================================

@app.route("/")

def home():

    return jsonify({
        "mensaje": "Backend API 1 funcionando"
    })

# =========================================
# LOGIN
# =========================================

@app.route("/login", methods=["POST"])

def login():

    data = request.json

    usuario = data.get("usuario")
    password = data.get("password")

    sql = """
        SELECT *
        FROM usuarios
        WHERE usuario=%s
        AND password=%s
    """

    cursor.execute(sql, (usuario, password))

    user = cursor.fetchone()

    if user:

        return jsonify({
            "success": True,
            "usuario": user["usuario"],
            "rol": user["rol"]
        })

    return jsonify({
        "success": False,
        "mensaje": "Credenciales incorrectas"
    }), 401

# =========================================
# USUARIOS
# =========================================

@app.route("/usuarios", methods=["GET"])

def obtener_usuarios():

    cursor.execute("SELECT id, usuario, rol FROM usuarios")

    usuarios = cursor.fetchall()

    return jsonify(usuarios)

# =========================================
# CLIENTES
# =========================================

@app.route("/clientes", methods=["GET"])

def obtener_clientes():

    cursor.execute("SELECT * FROM clientes")

    clientes = cursor.fetchall()

    return jsonify(clientes)

# =========================================
# PRODUCTOS
# =========================================

@app.route("/productos", methods=["GET"])

def obtener_productos():

    cursor.execute("SELECT * FROM productos")

    productos = cursor.fetchall()

    return jsonify(productos)

# =========================================
# VENTAS
# =========================================

@app.route("/ventas", methods=["GET"])

def obtener_ventas():

    cursor.execute("SELECT * FROM ventas")

    ventas = cursor.fetchall()

    return jsonify(ventas)

# =========================================
# EJECUTAR
# =========================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000
    )
        
