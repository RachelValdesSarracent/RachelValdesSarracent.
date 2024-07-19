// Arreglo para almacenar las reservas
let reservas = [];

// Función para crear una nueva reserva
function crearReserva() {
    // Obtener los valores de los campos de entrada
    let nombre = document.getElementById('nom').value;
    let apellido = document.getElementById('ape').value;
    let numeroHabitacion = document.getElementById('num').value;
    let fechaEntrada = document.getElementById('entrada').value;
    let fechaSalida = document.getElementById('salida').value;

    // Validación de datos
    if (nombre === '' || apellido === '' || numeroHabitacion === '' || fechaEntrada === '' || fechaSalida === '') {
        alert("Por favor, completa todos los campos.");
        return; // Detener la ejecución si hay campos vacíos
    }

    // Validar fecha de entrada (debe ser igual o mayor a la fecha actual)
    let fechaActual = new Date();
    let fechaEntradaObj = new Date(fechaEntrada);
    if (fechaEntradaObj < fechaActual) {
        alert("La fecha de entrada no puede ser anterior a la fecha actual.");
        return;
    }

    // Validar fecha de salida (debe ser mayor a la fecha de entrada)
    if (new Date(fechaSalida) <= new Date(fechaEntrada)) {
        alert("La fecha de salida debe ser posterior a la fecha de entrada.");
        return;
    }

    // Crear un objeto de reserva
    let nuevaReserva = {
        nombre: nombre,
        apellido: apellido,
        numeroHabitacion: numeroHabitacion,
        fechaEntrada: fechaEntrada,
        fechaSalida: fechaSalida
    };

    // Agregar la nueva reserva al arreglo
    reservas.push(nuevaReserva);

    // Limpiar los campos de entrada
    document.getElementById('nom').value = '';
    document.getElementById('ape').value = '';
    document.getElementById('num').value = '';
    document.getElementById('entrada').value = '';
    document.getElementById('salida').value = '';

    // Mostrar un mensaje de confirmación
    alert("Reserva creada correctamente.");

    // Actualizar la lista desplegable de reservas
    actualizarListaReservas();
}

// Función para actualizar la lista desplegable de reservas
function actualizarListaReservas() {
    let reservasSelect = document.getElementById('reservasSelect');
    reservasSelect.innerHTML = '<option value="">Selecciona una reserva</option>'; // Limpiar opciones existentes

    // Agregar las opciones a la lista desplegable
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        let option = document.createElement('option');
        option.value = i; // Guardar el índice de la reserva
        option.text = `${reserva.nombre} ${reserva.apellido} - Habitación ${reserva.numeroHabitacion}`;
        reservasSelect.add(option);
    }
}

// Función para mostrar el formulario de mostrar detalles
function mostrarFormulario3() {
    document.getElementById('MostrarDetalles').style.display = 'block';
    // Mostrar las reservas en la tabla
    mostrarReservasEnTabla();
}

// Función para cancelar una reserva
function cancelarReserva() {
    let reservaIndex = document.getElementById('reservasSelect').value; // Obtiene el índice de la reserva seleccionada

    if (reservaIndex === '') {
        alert("Por favor, selecciona una reserva.");
        return;
    }

    // Elimina la reserva del arreglo
    reservas.splice(reservaIndex, 1);

    // Actualizar la lista desplegable de reservas
    actualizarListaReservas();

    // Muestra un mensaje de alerta para confirmar la cancelación
    alert("Reserva cancelada correctamente.");
}

// Función para mostrar las reservas en la tabla
function mostrarReservasEnTabla() {
    // Limpiar el contenido del cuerpo de la tabla
    document.getElementById('tablaReservas').getElementsByTagName('tbody')[0].innerHTML = '';

    // Recorrer el arreglo de reservas
    for (let i = 0; i < reservas.length; i++) {
        // Obtener la reserva actual
        let reserva = reservas[i];

        // Crear una nueva fila en la tabla
        let fila = document.getElementById('tablaReservas').getElementsByTagName('tbody')[0].insertRow();

        // Crear celdas para cada columna
        let celdaNombre = fila.insertCell();
        let celdaApellido = fila.insertCell();
        let celdaNumeroHabitacion = fila.insertCell();
        let celdaFechaEntrada = fila.insertCell();
        let celdaFechaSalida = fila.insertCell();

        // Agregar el contenido de la reserva a las celdas
        celdaNombre.innerHTML = reserva.nombre;
        celdaApellido.innerHTML = reserva.apellido;
        celdaNumeroHabitacion.innerHTML = reserva.numeroHabitacion;
        celdaFechaEntrada.innerHTML = reserva.fechaEntrada;
        celdaFechaSalida.innerHTML = reserva.fechaSalida;
    }
}

// Función para generar un informe de las reservas
function generarInformeReservas() {
    // Verificar si hay reservas
    if (reservas.length === 0) {
        alert("No hay reservas para generar un informe.");
        return;
    }

    // Crear una cadena de texto para el informe
    let informe = "<h1>Informe de Reservas</h1>\n";
    informe += "<table>\n";
    informe += "<tr><th>Nombre</th><th>Apellido</th><th>Habitación</th><th>Entrada</th><th>Salida</th></tr>\n";
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        informe += `<tr><td>${reserva.nombre}</td><td>${reserva.apellido}</td><td>${reserva.numeroHabitacion}</td><td>${reserva.fechaEntrada}</td><td>${reserva.fechaSalida}</td></tr>\n`;
    }
    informe += "</table>";

    // Mostrar el informe en una nueva ventana
    let nuevaVentana = window.open("", "Informe de Reservas", "width=600,height=400");
    nuevaVentana.document.write(informe);
}