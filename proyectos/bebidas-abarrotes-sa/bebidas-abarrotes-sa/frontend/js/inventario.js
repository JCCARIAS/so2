

// =====================================
// INVENTARIO CRUD COMPLETO
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarProductos();

    }
);

// =====================================
// CARGAR PRODUCTOS
// =====================================

async function cargarProductos() {

    try {

        const response =
            await fetch("/api/productos");

        const productos =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaProductos"
            );

        tabla.innerHTML = "";

        productos.forEach(producto => {

            tabla.innerHTML += `

                <tr>

                    <td>${producto.id}</td>

                    <td>${producto.nombre}</td>

                    <td>Q ${producto.precio}</td>

                    <td>${producto.stock}</td>

                    <td>

                        <button
                            class="btn btn-primary"
                            onclick="editarProducto(${producto.id})"
                        >
                            Editar
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="eliminarProducto(${producto.id})"
                        >
                            Eliminar
                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =====================================
// AGREGAR PRODUCTO
// =====================================

async function agregarProducto() {

    const nombre =
        document.getElementById(
            "nombre"
        ).value;

    const precio =
        document.getElementById(
            "precio"
        ).value;

    const stock =
        document.getElementById(
            "stock"
        ).value;

    await fetch("/api/productos", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body: JSON.stringify({

            nombre,
            precio,
            stock

        })

    });

    cargarProductos();

}

// =====================================
// ELIMINAR PRODUCTO
// =====================================

async function eliminarProducto(id) {

    await fetch(`/api/productos/${id}`, {

        method: "DELETE"

    });

    cargarProductos();

}

// =====================================
// EDITAR PRODUCTO
// =====================================

async function editarProducto(id) {

    const nombre =
        prompt("Nuevo nombre:");

    const precio =
        prompt("Nuevo precio:");

    const stock =
        prompt("Nuevo stock:");

    await fetch(`/api/productos/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type":
                "application/json"

        },

        body: JSON.stringify({

            nombre,
            precio,
            stock

        })

    });

    cargarProductos();

}
    