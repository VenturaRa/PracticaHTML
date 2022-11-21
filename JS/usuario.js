const users=[
    {   
        "id":1,
        "nombre": "Ventura",
        "apellidos": "Rodriguez",
        "telefono": "678776544",
        "email": "ventura@gmail.com",
        "contraseña": "1234",
        "sexo": "hombre",

    },
    {   
        "id":5,
        "nombre": "Ventura",
        "apellidos": "Rodriguez",
        "telefono": "678776544",
        "email": "ventura@gmail.com",
        "contraseña": "1234",
        "sexo": "hombre",

    },
    {   
        "id":2,
        "nombre": "Antonio",
        "apellidos": "Sanchez",
        "telefono": "678098123",
        "email": "antonio@gmail.com",
        "contraseña": "12345",
        "sexo": "hombre",

    },
    {   
        "id":3,
        "nombre": "Pedro",
        "apellidos": "Perez",
        "telefono": "654345654",
        "email": "pedro@gmail.com",
        "contraseña": "123456",
        "sexo": "hombre",

    },
]
window.onload =
    function insertar() {
        let tbody = document.getElementById('id_tbody');
        let btneliminar="X";

		    for(i=0;i<users.length;i++){
			    let row = document.createElement('tr');
                row.id = 'eliminar'+i;
			    tbody.appendChild(row);

			    column = document.createElement('td');
			    column.innerText = users[i].nombre; 
			    row.appendChild(column);

			    column = document.createElement('td');
			    column.innerText = users[i].apellidos; 
			    row.appendChild(column);

			    column = document.createElement('td');
			    column.innerText = users[i].telefono; 
			    row.appendChild(column);

			    column = document.createElement('td');
			    column.innerText = users[i].email; 
			    row.appendChild(column);

			    column = document.createElement('td');
			    column.innerText = users[i].sexo; 
			    row.appendChild(column);

			    column = document.createElement('td');
			    column.innerHTML = '<button type="button" id="eliminar" onclick="eliminar('+i+')">'+btneliminar+'</button>';
			    row.appendChild(column);
	}
    
    }
function eliminar(id) {
    let tr = document.querySelector('#eliminar'+id);
    if (confirm("Estas seguro de eliminar este registro?")) {
        tr.remove();
    }
}
function buscador(){
    var num_cols, display, input, filter, table_body, tr, td, i, txtValue;
    num_cols = 5;
    input = document.getElementById("buscador");
    filter = input.value.toUpperCase();
    table_body = document.getElementById("id_tbody");
    tr = table_body.getElementsByTagName("tr");

    for(i=0; i< tr.length; i++){				
        display = "none";
        for(j=0; j < num_cols; j++){
            td = tr[i].getElementsByTagName("td")[j];
            if(td == tr[i].getElementsByTagName("td")[0] || tr[i].getElementsByTagName("td")[1]){
                txtValue = td.textContent || td.innerText;
                if(txtValue.toUpperCase().indexOf(filter) > -1){
                    display = "";
                }
            }
        }
        tr[i].style.display = display;
    }
    input.addEventListener('keyup', buscador);
}	
buscador();