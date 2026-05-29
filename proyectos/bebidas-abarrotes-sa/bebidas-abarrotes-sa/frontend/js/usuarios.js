
document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarUsuarios();

    }
);

async function cargarUsuarios() {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await fetch("/api/usuarios", {

                headers: {

                    Authorization: token

                }

            });

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

async function agregarUsuario() {

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    const rol =
        document.getElementById("rol").value;

    if (!usuario || !password || !rol) {

        alert(
            "Complete todos los campos"
        );

        return;

    }

    const token =
        localStorage.getItem("token");

    await fetch("/api/usuarios", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json",

            Authorization:
                token

        },

        body: JSON.stringify({

            usuario,
            password,
            rol

        })

    });

    cargarUsuarios();

}

async function eliminarUsuario(id) {

    if (
        !confirm(
            "¿Eliminar usuario?"
        )
    ) {

        return;

    }

    const token =
        localStorage.getItem("token");

    await fetch(

        `/api/usuarios/${id}`,

        {

            method: "DELETE",

            headers: {

                Authorization:
                    token

            }

        }

    );

    cargarUsuarios();

}

async function editarUsuario(id) {

    const usuario =
        prompt(
            "Nuevo usuario:"
        );

    const rol =
        prompt(
            "Nuevo rol:"
        );

    if (!usuario || !rol) {

        return;

    }

    const token =
        localStorage.getItem("token");

    await fetch(

        `/api/usuarios/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json",

                Authorization:
                    token

            },

            body: JSON.stringify({

                usuario,
                rol

            })

        }

    );

    cargarUsuarios();

}
