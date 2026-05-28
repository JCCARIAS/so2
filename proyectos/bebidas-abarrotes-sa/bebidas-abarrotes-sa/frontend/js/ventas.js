

// =====================================
// VENTAS MYSQL REAL
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarVentas();

    }
);

// =====================================
// CARGAR VENTAS
// =====================================

async function cargarVentas() {

    try {

        const response =
            await fetch("/api/ventas");

        const ventas =
            await response.json();

        const tbody =
            document.querySelector(
                "tbody"
            );

        if (!tbody) return;

        tbody.innerHTML = "";

        ventas.forEach(venta => {

            tbody.innerHTML += `

                <tr>

                    <td>${venta.id}</td>

                    <td>${venta.producto}</td>

                    <td>${venta.cantidad}</td>

                    <td>Q ${venta.total}</td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =====================================
// AGREGAR VENTA
// =====================================

async function agregarVenta() {

    const producto =
        prompt("Producto:");

    const cantidad =
        prompt("Cantidad:");

    const total =
        prompt("Total:");

    await fetch("/api/ventas", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            producto,
            cantidad,
            total

        })

    });

    cargarVentas();

}
    