

function verificarSesion() {

    const usuario =
        localStorage.getItem("usuario");

    if (!usuario) {

        window.location.href =
            "login.html";
    }
}

function logout() {

    localStorage.removeItem(
        "usuario"
    );

    window.location.href =
        "login.html";
}

document.addEventListener(
    "DOMContentLoaded",
    verificarSesion
);
