# backend-api-2/app.py

id="9v8k2t"
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

ventas = [

    {
        "id": 1,
        "cliente": "Juan Pérez",
        "producto": "Coca Cola",
        "total": 250
    },

    {
        "id": 2,
        "cliente": "María López",
        "producto": "Pepsi",
        "total": 410
    }
]

@app.route("/")
def home():

    return jsonify({
        "mensaje":
            "Backend API 2 funcionando"
    })

@app.route("/ventas", methods=["GET"])
def obtener_ventas():

    return jsonify(ventas)

@app.route("/ventas", methods=["POST"])
def crear_venta():

    data = request.json

    nueva = {

        "id":
            len(ventas) + 1,

        "cliente":
            data["cliente"],

        "producto":
            data["producto"],

        "total":
            data["total"]
    }

    ventas.append(nueva)

    return jsonify({

        "mensaje":
            "Venta creada",

        "venta":
            nueva
    })

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000
    )


