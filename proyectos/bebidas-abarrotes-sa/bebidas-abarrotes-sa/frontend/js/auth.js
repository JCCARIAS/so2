

// =====================================
// AUTH JWT
// =====================================

window.onload = function () {

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    if (!loginForm) return;

    loginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const usuario =
                document.getElementById(
                    "usuario"
                ).value
                .trim();

            const password =
                document.getElementById(
                    "password"
                ).value
                .trim();

            try {

                const response =
                    await fetch(
                        "/api/login",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body: JSON.stringify({

                                usuario,
                                password

                            })

                        }
                    );

                const data =
                    await response.json();

                console.log(data);

                if (data.success) {

                    // =====================
                    // GUARDAR TOKEN
                    // =====================

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    localStorage.setItem(
                        "usuario",
                        data.usuario
                    );

                    localStorage.setItem(
                        "rol",
                        data.rol
                    );

                    // =====================
                    // REDIRECCIONES
                    // =====================

                    if (
                        data.rol === "admin"
                    ) {

                        window.location.href =
                            "pages/dashboard.html";

                        return;

                    }

                    if (
                        data.rol === "ventas"
                    ) {

                        window.location.href =
                            "pages/ventas.html";

                        return;

                    }

                    if (
                        data.rol === "inventario"
                    ) {

                        window.location.href =
                            "pages/inventario.html";

                        return;

                    }

                    if (
                        data.rol === "finanzas"
                    ) {

                        window.location.href =
                            "pages/finanzas.html";

                        return;

                    }

                    // =====================
                    // DEFAULT
                    // =====================

                    window.location.href =
                        "pages/dashboard.html";

                } else {

                    alert(
                        data.error ||
                        "Credenciales incorrectas"
                    );

                }

            } catch (error) {

                console.error(error);

                alert(
                    "Error conectando con servidor"
                );

            }

        }
    );

};

// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.clear();

    window.location.href =
        "/login.html";

}
        
