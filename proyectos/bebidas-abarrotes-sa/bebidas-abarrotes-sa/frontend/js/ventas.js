

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarVentas();

        document
            .getElementById("formVenta")
            .addEventListener(
                "submit",
                guardarVenta
            );
    }
);

async function cargarVentas() {

    const ventas =
        await obtenerVentas();

    const tabla =
        document.getElementById(
            "tablaVentas"
        );

    tabla.innerHTML = "";

    ventas.forEach(venta => {

        tabla.innerHTML += `

            <tr>

                <td>${venta.id}</td>

                <td>${venta.cliente}</td>

                <td>${venta.producto}</td>

                <td>Q ${venta.total}</td>

                <td>

                    <span class="badge bg-success">

                        Completada

                    </span>

                </td>

            </tr>
        `;
    });
}

async function guardarVenta(e) {

    e.preventDefault();

    const venta = {

        cliente:
            document.getElementById(
                "cliente"
            ).value,

        producto:
            document.getElementById(
                "producto"
            ).value,

        total:
            document.getElementById(
                "total"
            ).value
    };

    await crearVenta(venta);

    location.reload();
}
    