

from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector
import os
import time
import jwt
import bcrypt
import datetime

from functools import wraps

# =========================================
# APP
# =========================================

app = Flask(__name__)

CORS(app)

app.config["SECRET_KEY"] = "SUPER_SECRET_KEY"

# =========================================
# MYSQL
# =========================================

time.sleep(5)

db = mysql.connector.connect(

    host=os.getenv(
        "DB_HOST",
        "mysql"
    ),

    user=os.getenv(
        "DB_USER",
        "admin"
    ),

    password=os.getenv(
        "DB_PASSWORD",
        "admin123"
    ),

    database=os.getenv(
        "DB_NAME",
        "empresa"
    )

)

cursor = db.cursor(dictionary=True)

print("MYSQL CONECTADO BACKEND 1")

# =========================================
# TOKEN REQUIRED
# =========================================

def token_required(f):

    @wraps(f)

    def decorated(*args, **kwargs):

        token = None

        if "Authorization" in request.headers:

            token = request.headers[
                "Authorization"
            ]

        if not token:

            return jsonify({

                "error":
                    "Token requerido"

            }), 401

        try:

            data = jwt.decode(

                token,

                app.config["SECRET_KEY"],

                algorithms=["HS256"]

            )

            request.usuario = data

        except:

            return jsonify({

                "error":
                    "Token inválido"

            }), 401

        return f(*args, **kwargs)

    return decorated

# =========================================
# LOGIN
# =========================================

@app.route(
    "/api/login",
    methods=["POST"]
)

def login():

    data = request.json

    usuario = data.get("usuario")

    password = data.get("password")

    sql = """

        SELECT *

        FROM usuarios

        WHERE usuario = %s

    """

    cursor.execute(sql, (usuario,))

    user = cursor.fetchone()

    if not user:

        return jsonify({

            "success": False,

            "error":
                "Usuario no encontrado"

        }), 401

    if password != user["password"]:

        return jsonify({

            "success": False,

            "error":
                "Contraseña incorrecta"

        }), 401

    token = jwt.encode({

        "usuario":
            user["usuario"],

        "rol":
            user["rol"],

        "exp":
            datetime.datetime.utcnow()
            + datetime.timedelta(hours=8)

    },

    app.config["SECRET_KEY"],

    algorithm="HS256")

    return jsonify({

        "success": True,

        "token": token,

        "usuario":
            user["usuario"],

        "rol":
            user["rol"]

    })

# =========================================
# DASHBOARD STATS
# =========================================

@app.route(
    "/api/dashboard/stats",
    methods=["GET"]
)

@token_required

def dashboard_stats():

    # TOTAL USUARIOS

    cursor.execute(
        "SELECT COUNT(*) AS total FROM usuarios"
    )

    usuarios = cursor.fetchone()["total"]

    # TOTAL PRODUCTOS

    cursor.execute(
        "SELECT COUNT(*) AS total FROM productos"
    )

    productos = cursor.fetchone()["total"]

    # TOTAL CLIENTES

    cursor.execute(
        "SELECT COUNT(*) AS total FROM clientes"
    )

    clientes = cursor.fetchone()["total"]

    # TOTAL VENTAS

    cursor.execute(
        "SELECT SUM(total) AS total FROM ventas"
    )

    ventas = cursor.fetchone()["total"]

    return jsonify({

        "usuarios": usuarios,

        "productos": productos,

        "clientes": clientes,

        "ventas": ventas or 0

    })

# =========================================
# USUARIOS
# =========================================

@app.route(
    "/api/usuarios",
    methods=["GET"]
)

@token_required

def obtener_usuarios():

    cursor.execute(
        "SELECT * FROM usuarios"
    )

    usuarios = cursor.fetchall()

    return jsonify(usuarios)

# =========================================
# PRODUCTOS
# =========================================

@app.route(
    "/api/productos",
    methods=["GET"]
)

@token_required

def obtener_productos():

    cursor.execute(
        "SELECT * FROM productos"
    )

    productos = cursor.fetchall()

    return jsonify(productos)

# =========================================
# CLIENTES
# =========================================

@app.route(
    "/api/clientes",
    methods=["GET"]
)

@token_required

def obtener_clientes():

    cursor.execute(
        "SELECT * FROM clientes"
    )

    clientes = cursor.fetchall()

    return jsonify(clientes)

# =========================================
# VENTAS
# =========================================

@app.route(
    "/api/ventas",
    methods=["GET"]
)

@token_required

def obtener_ventas():

    cursor.execute(
        "SELECT * FROM ventas"
    )

    ventas = cursor.fetchall()

    return jsonify(ventas)

# =========================================
# STATUS
# =========================================

@app.route("/status")

def status():

    return jsonify({

        "backend":
            "API 1",

        "status":
            "online",

        "secure":
            True

    })

# =========================================
# MONITOR
# =========================================

@app.route("/monitor")

def monitor():

    return jsonify({

        "cpu": "OK",

        "memory": "OK",

        "mysql": "CONNECTED",

        "backend": "API 1"

    })

# =========================================
# HOME
# =========================================

@app.route("/")

def home():

    return jsonify({

        "message":
            "Backend API 1 seguro funcionando"

    })

# =========================================
# START
# =========================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )
    
