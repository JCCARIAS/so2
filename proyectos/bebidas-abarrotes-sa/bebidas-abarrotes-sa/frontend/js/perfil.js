

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarPerfil();
    }
);

function cargarPerfil() {

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );

    if (usuario) {

        const nombre =
            document.getElementById(
                "nombreUsuario"
            );

        if (nombre) {

            nombre.innerText =
                usuario.usuario;
        }
    }

    console.log(
        "Perfil cargado"
    );
}
    