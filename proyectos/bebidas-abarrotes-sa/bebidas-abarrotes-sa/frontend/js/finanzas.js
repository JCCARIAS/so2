

// =====================================
// DASHBOARD DINÁMICO
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarDashboard();

    }
);

// =====================================
// CARGAR STATS
// =====================================

async function cargarDashboard() {

    try {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                "/api/dashboard/stats",
                {

                    headers: {

                        Authorization:
                            token

                    }

                }
            );

        const data =
            await response.json();

        document.getElementById(
            "totalVentas"
        ).innerText =
            "Q " + data.ventas;

        document.getElementById(
            "totalProductos"
        ).innerText =
            data.productos;

        document.getElementById(
            "totalClientes"
        ).innerText =
            data.clientes;

        document.getElementById(
            "totalUsuarios"
        ).innerText =
            data.usuarios;

    } catch (error) {

        console.error(error);

    }

}
    