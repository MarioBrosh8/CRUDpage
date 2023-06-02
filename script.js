let listaTareas = [];

const objTarea = {
id: '',
nombre: '',
puesto: ''

}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || puestoInput.value === '') {
        alert('Todos los campos son obligatorios.')
        return;
    }
    if(editando){
        editarEmpleado();
        editando = false;

    } else {
        objTarea.id = Date.now();
        objTarea.nombre = nombreInput.value;
        objTarea.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaTareas.push({...objTarea});
    mostrarEmpleados();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto(){
    objTarea.id = '';
    objTarea.nombre = '';
    objTarea.puesto = '';

}

function mostrarEmpleados() {

    limpiarHTML();
    

    const tareas = document.querySelector('.lista-tareas')

    listaTareas.forEach(empleado => {
        const {id, nombre, puesto} = empleado;
    
        const parrafo = document.createElement('p');
        parrafo.textContent =  `${nombre}  ${puesto}`;
        parrafo.classList.add('list-item');
        parrafo.dataset.id;



        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        tareas.appendChild(parrafo);


    });
}

function cargarEmpleado(empleado){
 const {id, nombre ,puesto} = empleado;
 nombreInput.value = nombre;
 puestoInput.value = puesto;

 objTarea.id = id;

 formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'

 editando = true;
}

function editarEmpleado(){
    objTarea.nombre = nombreInput.value;
    objTarea.puesto = puestoInput.value;

    listaTareas.map( empleado => {
        if(empleado.id === objTarea.id ){
            empleado.id = objTarea.id;
            empleado.nombre = objTarea.nombre;
            empleado.puesto = objTarea.puesto;

        }
    });

    limpiarHTML();
    mostrarEmpleados();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'

    editando = false;
}

function eliminarEmpleado (id){
    listaTareas = listaTareas.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const lista = document.querySelector('.lista-tareas');
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}


