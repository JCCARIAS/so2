
 id="q3m8cl"
async function cargarNavbar() {

    const navbarContainer =
        document.getElementById(
            "navbar-container"
        );

    if (!navbarContainer) return;

    const response =
        await fetch(
            "components/navbar.html"
        );

    const html =
        await response.text();

    navbarContainer.innerHTML =
        html;

    cargarUsuarioNavbar();
}

function cargarUsuarioNavbar() {

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );

    if (!usuario) return;

    const usuarioElement =
        document.getElementById(
            "usuarioActual"
        );

    if (usuarioElement) {

        usuarioElement.innerHTML =
            usuario.username;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    cargarNavbar
);

