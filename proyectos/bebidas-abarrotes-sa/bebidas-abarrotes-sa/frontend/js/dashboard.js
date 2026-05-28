

const API_1 =
    "http://localhost:5001";

const API_2 =
    "http://localhost:5002";

/* =========================
   INVENTARIO
========================= */

async function obtenerProductos() {

    try {

        const response =
            await fetch(
                `${API_1}/productos`
            );

        return await response.json();

    } catch (error) {

        console.error(error);
    }
}

async function crearProducto(data) {

    try {

        const response =
            await fetch(
                `${API_1}/productos`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)
                }
            );

        return await response.json();

    } catch (error) {

        console.error(error);
    }
}

/* =========================
   VENTAS
========================= */

async function obtenerVentas() {

    try {

        const response =
            await fetch(
                `${API_2}/ventas`
            );

        return await response.json();

    } catch (error) {

        console.error(error);
    }
}

async function crearVenta(data) {

    try {

        const response =
            await fetch(
                `${API_2}/ventas`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)
                }
            );

        return await response.json();

    } catch (error) {

        console.error(error);
    }
}


