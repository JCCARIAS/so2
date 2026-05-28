
 id="yt1v4z"
async function cargarSidebar() {

    const sidebarContainer =
        document.getElementById(
            "sidebar-container"
        );

    if (!sidebarContainer) return;

    const response =
        await fetch(
            "components/sidebar.html"
        );

    const html =
        await response.text();

    sidebarContainer.innerHTML =
        html;

    activarMenu();

    aplicarRoles();
}

function activarMenu() {

    const pagina =
        window.location.pathname
            .split("/")
            .pop();

    const links =
        document.querySelectorAll(
            ".sidebar-menu a"
        );

    links.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === pagina
        ) {

            link.classList.add("active");
        }
    });
}

function aplicarRoles() {

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );

    if (!usuario) return;

    const rol =
        usuario.rol;

    if (rol === "ventas") {

        ocultar([
            "menu-inventario",
            "menu-finanzas",
            "menu-usuarios",
            "menu-configuracion"
        ]);
    }

    if (rol === "inventario") {

        ocultar([
            "menu-ventas",
            "menu-finanzas",
            "menu-usuarios",
            "menu-reportes",
            "menu-configuracion"
        ]);
    }

    if (rol === "finanzas") {

        ocultar([
            "menu-inventario",
            "menu-ventas",
            "menu-usuarios"
        ]);
    }
}

function ocultar(ids) {

    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.parentElement.style.display =
                "none";
        }
    });
}

document.addEventListener(
    "DOMContentLoaded",
    cargarSidebar
);

