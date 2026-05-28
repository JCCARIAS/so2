

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarReportes();
    }
);

function cargarReportes() {

    const reportes = [

        {
            id: 1,
            nombre: "Reporte Ventas Mayo",
            fecha: "27/05/2026",
            estado: "Generado"
        },

        {
            id: 2,
            nombre: "Reporte Inventario",
            fecha: "26/05/2026",
            estado: "Generado"
        },

        {
            id: 3,
            nombre: "Reporte Finanzas",
            fecha: "25/05/2026",
            estado: "Pendiente"
        }
    ];

    const tabla =
        document.getElementById(
            "tablaReportes"
        );

    tabla.innerHTML = "";

    reportes.forEach(reporte => {

        tabla.innerHTML += `

            <tr>

                <td>${reporte.id}</td>

                <td>${reporte.nombre}</td>

                <td>${reporte.fecha}</td>

                <td>

                    <span class="badge ${
                        reporte.estado === "Generado"
                        ? "bg-success"
                        : "bg-warning"
                    }">

                        ${reporte.estado}

                    </span>

                </td>

                <td>

                    <button class="btn btn-primary btn-sm">

                        Descargar

                    </button>

                </td>

            </tr>
        `;
    });
}
    
