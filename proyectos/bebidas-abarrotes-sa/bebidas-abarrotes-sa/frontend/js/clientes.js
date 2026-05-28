

// =====================================
// CLIENTES MYSQL REAL
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarClientes();

    }
);

// =====================================
// CARGAR CLIENTES
// =====================================

async function cargarClientes() {

    try {

        const response =
            await fetch("/api/clientes");

        const clientes =
            await response.json();

        const tbody =
            document.querySelector(
                "tbody"
            );

        if (!tbody) return;

        tbody.innerHTML = "";

        clientes.forEach(cliente => {

            tbody.innerHTML += `

                <tr>

                    <td>${cliente.id}</td>

                    <td>${cliente.nombre}</td>

                    <td>${cliente.telefono}</td>

                    <td>${cliente.direccion}</td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}
    
