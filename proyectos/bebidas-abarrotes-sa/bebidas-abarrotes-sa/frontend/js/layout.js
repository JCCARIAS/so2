

// =====================================
// LAYOUT.JS
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        verificarSesion();

        await cargarNavbar();

        await cargarSidebar();

        aplicarPermisos();

    }
);

// =====================================
// VERIFICAR SESIÓN
// =====================================

function verificarSesion() {

    const usuario =
        localStorage.getItem("usuario");

    if (!usuario) {

        window.location.href =
            "../login.html";

    }

}

// =====================================
// CARGAR NAVBAR
// =====================================

async function cargarNavbar() {

    const response =
        await fetch(
            "../components/navbar.html"
        );

    const html =
        await response.text();

    document.getElementById(
        "navbar-container"
    ).innerHTML = html;

    const usuario =
        localStorage.getItem("usuario");

    const usuarioElemento =
        document.getElementById(
            "usuarioLogueado"
        );

    if (
        usuarioElemento &&
        usuario
    ) {

        usuarioElemento.innerText =
            usuario;

    }

}

// =====================================
// CARGAR SIDEBAR
// =====================================

async function cargarSidebar() {

    const response =
        await fetch(
            "../components/sidebar.html"
        );

    const html =
        await response.text();

    document.getElementById(
        "sidebar-container"
    ).innerHTML = html;

}

// =====================================
// PERMISOS POR ROL
// =====================================

function aplicarPermisos() {

    const rol =
        localStorage.getItem("rol");

    const menu =
        document.getElementById(
            "sidebar-menu"
        );

    if (!menu) return;

    let opciones = "";

    // =====================================
    // ADMIN
    // =====================================

    if (rol === "admin") {

        opciones = `

            <li>
                <a href="dashboard.html">
                    🏠 Dashboard
                </a>
            </li>

            <li>
                <a href="usuarios.html">
                    👨‍💻 Usuarios
                </a>
            </li>

            <li>
                <a href="reportes.html">
                    📑 Reportes
                </a>
            </li>

            <li>
                <a href="configuracion.html">
                    ⚙ Configuración
                </a>
            </li>

        `;

    }

    // =====================================
    // VENTAS
    // =====================================

    if (rol === "ventas") {

        opciones = `

            <li>
                <a href="ventas.html">
                    💰 Ventas
                </a>
            </li>

            <li>
                <a href="clientes.html">
                    👥 Clientes
                </a>
            </li>

        `;

    }

    // =====================================
    // INVENTARIO
    // =====================================

    if (rol === "inventario") {

        opciones = `

            <li>
                <a href="inventario.html">
                    📦 Inventario
                </a>
            </li>

        `;

    }

    // =====================================
    // FINANZAS
    // =====================================

    if (rol === "finanzas") {

        opciones = `

            <li>
                <a href="finanzas.html">
                    📊 Finanzas
                </a>
            </li>

            <li>
                <a href="reportes.html">
                    📑 Reportes
                </a>
            </li>

        `;

    }

    menu.innerHTML = opciones;

}

// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.clear();

    window.location.href =
        "../login.html";

}

// =====================================
// SIDEBAR MOBILE
// =====================================

function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );

    if (!sidebar) return;

    sidebar.classList.toggle(
        "active"
    );

}
    
