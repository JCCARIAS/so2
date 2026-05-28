

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

print("MYSQL CONECTADO BACKEND 2")

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
# DASHBOARD STATS
# =========================================

@app.route(
    "/api/dashboard/stats",
    methods=["GET"]
)

@token_required

def dashboard_stats():

    cursor.execute(
        "SELECT COUNT(*) AS total FROM usuarios"
    )

    usuarios = cursor.fetchone()["total"]

    cursor.execute(
        "SELECT COUNT(*) AS total FROM productos"
    )

    productos = cursor.fetchone()["total"]

    cursor.execute(
        "SELECT COUNT(*) AS total FROM clientes"
    )

    clientes = cursor.fetchone()["total"]

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
# STATUS
# =========================================

@app.route("/status")

def status():

    return jsonify({

        "backend":
            "API 2",

        "status":
            "online",

        "secure":
            True

    })

# =========================================
# HEALTH
# =========================================

@app.route("/health")

def health():

    return jsonify({

        "status":
            "healthy"

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

        "backend": "API 2"

    })

# =========================================
# HOME
# =========================================

@app.route("/")

def home():

    return jsonify({

        "message":
            "Backend API 2 seguro funcionando"

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
    