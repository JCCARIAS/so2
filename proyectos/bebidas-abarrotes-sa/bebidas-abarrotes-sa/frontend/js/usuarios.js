

// =====================================
// USUARIOS.JS MYSQL REAL
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarUsuarios();

    }
);

// =====================================
// CARGAR USUARIOS
// =====================================

async function cargarUsuarios() {

    try {

        const response =
            await fetch("/api/usuarios");

        const usuarios =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaUsuarios"
            );

        tabla.innerHTML = "";

        usuarios.forEach(usuario => {

            tabla.innerHTML += `

                <tr>

                    <td>${usuario.id}</td>

                    <td>${usuario.usuario}</td>

                    <td>${usuario.rol}</td>

                    <td>

                        <button
                            class="btn btn-primary"
                            onclick="editarUsuario(${usuario.id})"
                        >
                            Editar
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="eliminarUsuario(${usuario.id})"
                        >
                            Eliminar
                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =====================================
// AGREGAR USUARIO
// =====================================

async function agregarUsuario() {

    const usuario =
        document.getElementById(
            "usuario"
        ).value;

    const rol =
        document.getElementById(
            "rol"
        ).value;

    const nuevoUsuario = {

        usuario,
        password: "1234",
        rol

    };

    await fetch("/api/usuarios", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(
            nuevoUsuario
        )

    });

    cargarUsuarios();

}

// =====================================
// ELIMINAR
// =====================================

async function eliminarUsuario(id) {

    await fetch(`/api/usuarios/${id}`, {

        method: "DELETE"

    });

    cargarUsuarios();

}

// =====================================
// EDITAR
// =====================================

async function editarUsuario(id) {

    const usuario =
        prompt("Nuevo usuario:");

    const rol =
        prompt("Nuevo rol:");

    await fetch(`/api/usuarios/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            usuario,
            rol

        })

    });

    cargarUsuarios();

}
    
