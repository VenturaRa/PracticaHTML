const getOptions = window.location.search;

window.addEventListener(
    'load',
    function () {
        const nombre = document.getElementById("Nombre");
        const apellidos = document.getElementById("Apellidos");
        const contraseña = document.getElementById("Password");
        const telefono = document.getElementById("Telefono");
        const email = document.getElementById("Email");
        //const sexo = document.getElementByName("sexo")[0].value;


        document.getElementById('enviar').onclick = function sendInfo() {
            Swal.fire({
                title: '¿Seguro que quieres insertar ese usuario?',
                text: "?¿",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonColor: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const formData = new FormData();
                    formData.append('nombre', nombre.value);
                    formData.append('apellidos', apellidos.value);
                    formData.append('password', contraseña.value);
                    formData.append('telefono', telefono.value);
                    formData.append('email', email.value);
                    //formData.append('sexo', sexo.value);

                    await fetch('./WS/crearUsuario2.php', {
                        method: 'POST',
                        body: formData,
                    }).then((response) => {
                        if (response.ok) {
                            Swal.fire({
                                title: 'Perfecto!',
                                text: 'El usuario  ha sido insertado ',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    });
                }
            });
        };
    }
);