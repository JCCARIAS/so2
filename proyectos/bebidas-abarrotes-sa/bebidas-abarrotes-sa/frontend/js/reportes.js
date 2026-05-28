

// =====================================
// REPORTES.JS
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarReportes();

    }
);

// =====================================
// REPORTES
// =====================================

async function cargarReportes() {

    const reportes = [

        {
            nombre: "Ventas",
            total: "Q 120,000"
        },

        {
            nombre: "Clientes",
            total: "45"
        },

        {
            nombre: "Productos",
            total: "1,245"
        }

    ];

    console.table(reportes);

}

// =====================================
// EXPORTAR
// =====================================

function exportarReporte() {

    alert(
        "Reporte exportado correctamente"
    );

}
    