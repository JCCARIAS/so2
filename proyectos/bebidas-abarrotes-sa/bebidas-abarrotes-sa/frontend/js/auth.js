

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
                ).value;

            const password =
                document.getElementById(
                    "password"
                ).value;

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

                if (data.success) {

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

                    if (
                        data.rol === "admin"
                    ) {

                        window.location.href =
                            "pages/dashboard.html";

                    }

                    if (
                        data.rol === "ventas"
                    ) {

                        window.location.href =
                            "pages/ventas.html";

                    }

                    if (
                        data.rol === "inventario"
                    ) {

                        window.location.href =
                            "pages/inventario.html";

                    }

                    if (
                        data.rol === "finanzas"
                    ) {

                        window.location.href =
                            "pages/finanzas.html";

                    }

                } else {

                    alert(
                        "Credenciales incorrectas"
                    );

                }

            } catch (error) {

                console.error(error);

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
        