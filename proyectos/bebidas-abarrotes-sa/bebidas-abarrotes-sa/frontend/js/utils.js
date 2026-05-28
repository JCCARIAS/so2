function mostrarMensaje(

    mensaje,
    tipo = 'success'

){

    const alerta =
    document.createElement('div');

    alerta.className =
    `alert alert-${tipo}`;

    alerta.innerText =
    mensaje;

    document.body.prepend(alerta);

    setTimeout(() => {

        alerta.remove();

    },3000);
}