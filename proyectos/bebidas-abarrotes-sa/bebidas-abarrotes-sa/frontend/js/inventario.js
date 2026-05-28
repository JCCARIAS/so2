

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarProductos();

        document
            .getElementById("formProducto")
            .addEventListener(
                "submit",
                guardarProducto
            );
    }
);

async function cargarProductos() {

    const productos =
        await obtenerProductos();

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

                    <span class="badge bg-success">

                        Disponible

                    </span>

                </td>

                <td>

                    <button class="btn btn-warning btn-sm">

                        Editar

                    </button>

                    <button class="btn btn-danger btn-sm">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;
    });
}

async function guardarProducto(e) {

    e.preventDefault();

    const producto = {

        nombre:
            document.getElementById(
                "nombre"
            ).value,

        precio:
            document.getElementById(
                "precio"
            ).value,

        stock:
            document.getElementById(
                "stock"
            ).value
    };

    await crearProducto(producto);

    location.reload();
}
    