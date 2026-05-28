async function cargarGraficaVentas(){

    const ventas =
    await apiGet('/ventas');

    const total =
    ventas.length;

    document.getElementById(
        'graficaVentas'
    ).innerHTML = `

        <div class="card p-5 text-center">

            <h3>Total Ventas</h3>

            <h1>${total}</h1>

        </div>

    `;
}