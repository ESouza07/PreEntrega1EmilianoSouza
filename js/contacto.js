document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();

        if (validarFormulario()) {
            return;
        }
    });

    function validarFormulario() {
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('mail').value;
        const mensaje = document.getElementById('mensaje').value;

        if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos son obligatorios',
            });
            return false;
        }

        if (!validarEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'La dirección de correo electrónico no es válida',
            });
            return false;
        }


        guardarEnLocalStorage(nombre, email, mensaje);


        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Gracias por enviar el formulario',
            showConfirmButton: false,
            timer: 4000
        });


        document.getElementById('form').reset();

        return true;
    }

    function validarEmail(email) {

        return email.includes('@');
    }

    function guardarEnLocalStorage(nombre, email, mensaje) {

        const datosGuardados = JSON.parse(localStorage.getItem('datos') || '[]');


        const nuevoDato = { nombre, email, mensaje };
        datosGuardados.push(nuevoDato);


        localStorage.setItem('datos', JSON.stringify(datosGuardados));
    }
});





