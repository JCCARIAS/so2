window.onload = function () {

const loginForm = document.getElementById("loginForm");

if (!loginForm) {
    console.log("Formulario login no encontrado");
    return;
}

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    // =========================
    // LOGIN ADMIN
    // =========================

    if (usuario === "admin" && password === "1234") {

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", "admin");

        window.location.href = "pages/dashboard.html";

        return;
    }

    // =========================
    // LOGIN VENTAS
    // =========================

    if (usuario === "ventas1" && password === "1234") {

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", "ventas");

        window.location.href = "pages/ventas.html";

        return;
    }

    // =========================
    // LOGIN INVENTARIO
    // =========================

    if (usuario === "inventario1" && password === "1234") {

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", "inventario");

        window.location.href = "pages/inventario.html";

        return;
    }

    // =========================
    // LOGIN FINANZAS
    // =========================

    if (usuario === "finanzas1" && password === "1234") {

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", "finanzas");

        window.location.href = "pages/finanzas.html";

        return;
    }

    // =========================
    // LOGIN USUARIOS
    // =========================

    if (usuario === "usuario1" && password === "1234") {

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", "usuarios");

        window.location.href = "pages/usuarios.html";

        return;
    }

    // =========================
    // LOGIN REPORTES
    // =========================

    if (usuario === "reportes1" && password === "1234") {

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", "reportes");

        window.location.href = "pages/reportes.html";

        return;
    }

    alert("Usuario o contraseña incorrectos");

});

};

// ======================================
// MOSTRAR / OCULTAR PASSWORD
// ======================================

function togglePassword() {

const passwordInput = document.getElementById("password");

if (!passwordInput) return;

if (passwordInput.type === "password") {

    passwordInput.type = "text";

} else {

    passwordInput.type = "password";

}

}