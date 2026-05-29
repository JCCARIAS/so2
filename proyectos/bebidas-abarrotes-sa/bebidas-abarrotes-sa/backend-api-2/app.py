


from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector
import os
import time
import jwt
import datetime

from functools import wraps

app = Flask(__name__)

CORS(app)

app.config["SECRET_KEY"] = "SUPER_SECRET_KEY"

time.sleep(5)

db = mysql.connector.connect(

    host=os.getenv("DB_HOST", "mysql"),
    user=os.getenv("DB_USER", "admin"),
    password=os.getenv("DB_PASSWORD", "admin123"),
    database=os.getenv("DB_NAME", "empresa")

)

cursor = db.cursor(dictionary=True)

print("MYSQL CONECTADO BACKEND 2")

def token_required(f):

    @wraps(f)

    def decorated(*args, **kwargs):

        token = None

        if "Authorization" in request.headers:

            token = request.headers["Authorization"]

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

            "success": False

        }), 401

    if password != user["password"]:

        return jsonify({

            "success": False

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

@app.route(
    "/api/productos",
    methods=["POST"]
)

@token_required

def agregar_producto():

    data = request.json

    sql = """

        INSERT INTO productos (
            nombre,
            precio,
            stock
        )

        VALUES (%s, %s, %s)

    """

    values = (

        data["nombre"],
        data["precio"],
        data["stock"]

    )

    cursor.execute(sql, values)

    db.commit()

    return jsonify({

        "mensaje":
            "Producto agregado"

    })

@app.route(
    "/api/productos/<int:id>",
    methods=["PUT"]
)

@token_required

def editar_producto(id):

    data = request.json

    sql = """

        UPDATE productos

        SET
            nombre = %s,
            precio = %s,
            stock = %s

        WHERE id = %s

    """

    values = (

        data["nombre"],
        data["precio"],
        data["stock"],
        id

    )

    cursor.execute(sql, values)

    db.commit()

    return jsonify({

        "mensaje":
            "Producto actualizado"

    })

@app.route(
    "/api/productos/<int:id>",
    methods=["DELETE"]
)

@token_required

def eliminar_producto(id):

    sql = """

        DELETE FROM productos

        WHERE id = %s

    """

    cursor.execute(sql, (id,))

    db.commit()

    return jsonify({

        "mensaje":
            "Producto eliminado"

    })

@app.route("/")

def home():

    return jsonify({

        "message":
            "Backend API 2 funcionando"

    })

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )
    