

window.onload =
    /*function insertar1() {
        fetch('./WS/getUsuario.php')
            .then(response => response.json())
            .then(data => {
                let datosTabla = document.querySelector('#id_tabla');
                let cuerpo = datosTabla.createTBody();
                data.forEach(dato => {
                    let filaCuerpo = cuerpo.insertRow();
                    Object.values(dato).forEach(valor => {
                        let celda = filaCuerpo.insertCell();
                        celda.textContent = valor;
                    });
                    let celdaBoton = filaCuerpo.insertCell();
                    let botonEliminar = document.createElement('button');
                    botonEliminar.textContent = 'Eliminar';
                    botonEliminar.addEventListener('click', function () {
                        eliminar(dato.id, filaCuerpo);
                    });
                    let botonModificar = document.createElement('button');
                    botonModificar.textContent = 'Modificar';
                    botonModificar.addEventListener('click', function () {
                        modificar(dato.id, filaCuerpo);
                    });
                    celdaBoton.appendChild(botonEliminar);
                    celdaBoton.appendChild(botonModificar);
                });
            });
    }*/

function insertar() {
    fetch('./WS/getUsuario.php')
        .then(function (body) {
            user = body.json();
            return user;
        }).then(function (data) {
            users = data;

            let tvalue = "";
            tvalue += "<thead>";
            tvalue += "<tr>";
            tvalue += "<th>Id</th>";
            tvalue += "<th>Nombre</th>";
            tvalue += "<th>Apellidos</th>";
            tvalue += "<th>Telefono</th>";
            tvalue += "<th>Email</th>";
            tvalue += "<th>Sexo</th>";
            tvalue += "<th>Eliminar</th>";
            tvalue += "<th>Modificar</th>";
            tvalue += "</tr>";
            tvalue += "</thead>";

            let id_accion = "id_accion";

            for (let i = 0; i < users.length; i++) {
                tvalue += "<tr>";
                tvalue += "<td>" + users[i].id + "</td>";
                tvalue += "<td>" + users[i].nombre + "</td>";
                tvalue += "<td>" + users[i].apellidos + "</td>";
                tvalue += "<td>" + users[i].telefono + "</td>";
                tvalue += "<td>" + users[i].email + "</td>";
                tvalue += "<td>" + users[i].sexo + "</td>";
                tvalue += "<td><button onclick='eliminar(" + users[i].id + ")' " + "id = '" + id_accion + " type='button' '</button>X</td>";
                tvalue += "<td><button onclick='modificar(" + users[i].id + ")' " + "id = '" + i + "' type='button' class='modificar' data-open='modal1'>Modificar</button><button onclick='guardar(" + i + ")' " + " type='button' class='guardar' data-open='modal1'>Guardar</button></td>";
                tvalue += "</tr>";
            }
            document.getElementById('id_tabla').innerHTML = tvalue;
            Array.from(document.getElementsByClassName("guardar")).forEach(elem => elem.style.display = "none");
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió algún error y no se puede cargar la tabla!'
            });
        });
}


/*function buscar(buscar) {
    let filtro = buscar.value.trim(b.value).toLowerCase();
    let tabla = document.getElementById("id_tabla");
    let tr = tabla.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (let l = 0; l < td.length; l++) {
            let celda = tr[l].getElementsByTagName("td")[l];
            if (celda) {
                if (filtro.length < 3) {
                    tr[l].style.display = "";
                } else {
                    if (celda.innerHTML.toLowerCase().indexOf(filtro) !== -1) {
                        tr[l].style.display = "";
                    }
                }
            }
        }
    }
}*/



function eliminar(id, fila) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este registro.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        dangerMode: true,
    })
        .then((confirmado) => {
            if (confirmado.isConfirmed) {
                fetch('./WS/deleteUsuario.php?id=' + id, { method: 'DELETE' })
                    .then(data => {
                        console.log(data);
                        if (confirmado.success) {
                            fila.parentNode.removeChild(fila);
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error", "No se pudo eliminar el registro2.", "error");
                        console.error(error);
                    });
            }
        });
}

function modificar(p) {
    Swal.fire({
        title: '¿?',
        text: "Seguro que quieres modificar este usuario.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementsByClassName("guardar")[p].style.display = "block";
            document.getElementsByClassName("modificar")[p].style.display = "none";
            let tabla = document.getElementById('id_tabla');
            for (i = 0; i < 6; i++) {
                let celdaTmp = tabla.rows[p + 1].cells[i];
                txt = celdaTmp.innerText;
                celdaTmp.innerText = "";
                let input = document.createElement('input');
                input.setAttribute("value", txt);
                celdaTmp.appendChild(input);
            }
        }
    }).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'error...',
            text: 'Ocurrió algún fallo y no se ha podido modificar!'
        });
    });
}

function guardar(row) {
    let valores = [];
    const formData = new FormData();
    let tabla = document.getElementById('id_tabla');
    let tabla_rows = tabla.rows[row + 1]
    for (let i = 0; i < tabla_rows.cells.length - 2; i++) {
        let celdaTmp = tabla.rows[row + 1].cells[i];
        txt = celdaTmp.childNodes[0].value;
        valores.push(txt);
        celdaTmp.innerHTML = "";
    }

    formData.append('id', valores[0]);
    formData.append('nombre', valores[1]);
    formData.append('apellidos', valores[2]);
	formData.append('telefono', valores[3]);
    formData.append('email', valores[4]);
	formData.append('sexo', valores[5]);
    document.getElementsByClassName("guardar")[row].style.display = "none";
    document.getElementsByClassName("modificar")[row].style.display = "block";

    let id= valores[0];
    console.log(id);
    fetch('./WS/modificarUsuario.php' + '?id=' + id, {
        method: 'POST',
        body: formData,
    }).then(function (res) {
        Swal.fire({
            title: 'Perfecto!',
            text: 'El usuario se ha modificado correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Acceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                modificar();
                window.location.reload();
            }
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió algún fallo y no se ha podido modificar!'
            });
        });
    });
}
