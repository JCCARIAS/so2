

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarClientes();

        document
            .getElementById("formCliente")
            .addEventListener(
                "submit",
                guardarCliente
            );
    }
);

let clientes = [

    {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan@gmail.com",
        telefono: "5555-1111",
        estado: "Activo"
    },

    {
        id: 2,
        nombre: "María López",
        email: "maria@gmail.com",
        telefono: "5555-2222",
        estado: "Activo"
    },

    {
        id: 3,
        nombre: "Carlos Méndez",
        email: "carlos@gmail.com",
        telefono: "5555-3333",
        estado: "Inactivo"
    }
];

function cargarClientes() {

    const tabla =
        document.getElementById(
            "tablaClientes"
        );

    tabla.innerHTML = "";

    clientes.forEach(cliente => {

        tabla.innerHTML += `

            <tr>

                <td>${cliente.id}</td>

                <td>${cliente.nombre}</td>

                <td>${cliente.email}</td>

                <td>${cliente.telefono}</td>

                <td>

                    <span class="badge ${
                        cliente.estado === "Activo"
                        ? "bg-success"
                        : "bg-danger"
                    }">

                        ${cliente.estado}

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

function guardarCliente(e) {

    e.preventDefault();

    const nuevoCliente = {

        id: clientes.length + 1,

        nombre:
            document.getElementById(
                "nombreCliente"
            ).value,

        email:
            document.getElementById(
                "emailCliente"
            ).value,

        telefono:
            document.getElementById(
                "telefonoCliente"
            ).value,

        estado: "Activo"
    };

    clientes.push(
        nuevoCliente
    );

    cargarClientes();

    document
        .getElementById("formCliente")
        .reset();

    const modal =
        bootstrap.Modal.getInstance(
            document.getElementById(
                "modalCliente"
            )
        );

    modal.hide();
}
    