



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

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(

                "/api/productos",

                {

                    headers: {

                        Authorization:
                            token

                    }

                }

            );

        const productos =
            await response.json();

        console.log(
            "RESPUESTA API:",
            productos
        );

        if (

            !Array.isArray(
                productos
            )

        ) {

            alert(

                JSON.stringify(
                    productos
                )

            );

            return;

        }

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

        alert(
            "Error cargando productos"
        );

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

    const token =
        localStorage.getItem(
            "token"
        );

    await fetch(

        "/api/productos",

        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json",

                Authorization:
                    token

            },

            body: JSON.stringify({

                nombre,
                precio,
                stock

            })

        }

    );

    cargarProductos();

}

// =====================================
// ELIMINAR PRODUCTO
// =====================================

async function eliminarProducto(id) {

    if (
        !confirm(
            "¿Eliminar producto?"
        )
    ) {

        return;

    }

    const token =
        localStorage.getItem(
            "token"
        );

    await fetch(

        `/api/productos/${id}`,

        {

            method: "DELETE",

            headers: {

                Authorization:
                    token

            }

        }

    );

    cargarProductos();

}

// =====================================
// EDITAR PRODUCTO
// =====================================

async function editarProducto(id) {

    const nombre =
        prompt(
            "Nuevo nombre:"
        );

    const precio =
        prompt(
            "Nuevo precio:"
        );

    const stock =
        prompt(
            "Nuevo stock:"
        );

    if (
        !nombre ||
        !precio ||
        !stock
    ) {

        return;

    }

    const token =
        localStorage.getItem(
            "token"
        );

    await fetch(

        `/api/productos/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json",

                Authorization:
                    token

            },

            body: JSON.stringify({

                nombre,
                precio,
                stock

            })

        }

    );

    cargarProductos();

}
    
