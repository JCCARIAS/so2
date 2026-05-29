

from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector
import os
import time
import jwt
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
        "SELECT id, usuario, rol FROM usuarios"
    )

    usuarios = cursor.fetchall()

    return jsonify(usuarios)

# =========================================
# CREAR USUARIO
# =========================================

@app.route(
    "/api/usuarios",
    methods=["POST"]
)

@token_required

def crear_usuario():

    data = request.json

    usuario = data["usuario"]

    password = data["password"]

    rol = data["rol"]

    cursor.execute(

        "SELECT * FROM usuarios WHERE usuario=%s",

        (usuario,)

    )

    existe = cursor.fetchone()

    if existe:

        return jsonify({

            "error":
                "Usuario ya existe"

        }), 400

    cursor.execute(

        """

        INSERT INTO usuarios
        (
            usuario,
            password,
            rol
        )

        VALUES
        (
            %s,
            %s,
            %s
        )

        """,

        (

            usuario,
            password,
            rol

        )

    )

    db.commit()

    return jsonify({

        "mensaje":
            "Usuario creado"

    })

# =========================================
# EDITAR USUARIO
# =========================================

@app.route(
    "/api/usuarios/<int:id>",
    methods=["PUT"]
)

@token_required

def editar_usuario(id):

    data = request.json

    cursor.execute(

        """

        UPDATE usuarios

        SET

            usuario=%s,

            rol=%s

        WHERE id=%s

        """,

        (

            data["usuario"],
            data["rol"],
            id

        )

    )

    db.commit()

    return jsonify({

        "mensaje":
            "Usuario actualizado"

    })

# =========================================
# ELIMINAR USUARIO
# =========================================

@app.route(
    "/api/usuarios/<int:id>",
    methods=["DELETE"]
)

@token_required

def eliminar_usuario(id):

    cursor.execute(

        "DELETE FROM usuarios WHERE id=%s",

        (id,)

    )

    db.commit()

    return jsonify({

        "mensaje":
            "Usuario eliminado"

    })

# =========================================
# HOME
# =========================================

@app.route("/")

def home():

    return jsonify({

        "message":
            "Backend API 1 funcionando"

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
    
from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector
import os
import time
import jwt
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
        "SELECT id, usuario, rol FROM usuarios"
    )

    usuarios = cursor.fetchall()

    return jsonify(usuarios)

@app.route(
    "/api/usuarios",
    methods=["POST"]
)

@token_required

def crear_usuario():

    data = request.json

    usuario = data["usuario"]

    password = data["password"]

    rol = data["rol"]

    cursor.execute(

        "SELECT * FROM usuarios WHERE usuario=%s",

        (usuario,)

    )

    existe = cursor.fetchone()

    if existe:

        return jsonify({

            "error":
                "Usuario ya existe"

        }), 400

    cursor.execute(

        """

        INSERT INTO usuarios
        (
            usuario,
            password,
            rol
        )

        VALUES
        (
            %s,
            %s,
            %s
        )

        """,

        (

            usuario,
            password,
            rol

        )

    )

    db.commit()

    return jsonify({

        "mensaje":
            "Usuario creado"

    })

@app.route(
    "/api/usuarios/<int:id>",
    methods=["PUT"]
)

@token_required

def editar_usuario(id):

    data = request.json

    cursor.execute(

        """

        UPDATE usuarios

        SET

            usuario=%s,

            rol=%s

        WHERE id=%s

        """,

        (

            data["usuario"],
            data["rol"],
            id

        )

    )

    db.commit()

    return jsonify({

        "mensaje":
            "Usuario actualizado"

    })

@app.route(
    "/api/usuarios/<int:id>",
    methods=["DELETE"]
)

@token_required

def eliminar_usuario(id):

    cursor.execute(

        "DELETE FROM usuarios WHERE id=%s",

        (id,)

    )

    db.commit()

    return jsonify({

        "mensaje":
            "Usuario eliminado"

    })

# =========================================
# HOME
# =========================================

@app.route("/")

def home():

    return jsonify({

        "message":
            "Backend API 2 funcionando"

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