

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarFinanzas();
    }
);

function cargarFinanzas() {

    const movimientos = [

        {
            id: 1,
            tipo: "Ingreso",
            descripcion: "Venta Coca Cola",
            monto: "Q 1,200",
            fecha: "27/05/2026"
        },

        {
            id: 2,
            tipo: "Gasto",
            descripcion: "Compra Inventario",
            monto: "Q 800",
            fecha: "27/05/2026"
        },

        {
            id: 3,
            tipo: "Ingreso",
            descripcion: "Venta Pepsi",
            monto: "Q 450",
            fecha: "27/05/2026"
        }
    ];

    const tabla =
        document.getElementById(
            "tablaFinanzas"
        );

    tabla.innerHTML = "";

    movimientos.forEach(item => {

        tabla.innerHTML += `

            <tr>

                <td>${item.id}</td>

                <td>

                    <span class="badge ${
                        item.tipo === "Ingreso"
                        ? "bg-success"
                        : "bg-danger"
                    }">

                        ${item.tipo}

                    </span>

                </td>

                <td>${item.descripcion}</td>

                <td>${item.monto}</td>

                <td>${item.fecha}</td>

            </tr>
        `;
    });
}

