document.addEventListener('DOMContentLoaded', mostrarMensajes);

let capaError = document.getElementById("capaError");


function guardarMensaje() {
    const mensajeInput = document.getElementById('mensajeInput');
    const mensaje = mensajeInput.value;

    if (mensaje.trim() === '') {

        capaError.textContent = "Por favor, introduce un mensaje.";
        capaError.style.opacity = 1; // Mostrar el mensaje inmediatamente

        setTimeout(() => {
            capaError.style.opacity = 0; // Ocultar el mensaje después de 5 segundos
        }, 5000);
        return;

    }

    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    const textos = new Set(tweets.map(tweet => tweet.texto));
    // Verificar duplicados ANTES de agregar
    if (textos.has(mensaje)) {
        // El mensaje ya existe
        capaError.textContent = "Este mensaje ya existe.";
        capaError.style.opacity = 1; // Mostrar el mensaje
        capaError.style.backgroundColor = "yellow";

        // Ocultar el mensaje después de 5 segundos (ajusta el tiempo según sea necesario)
        setTimeout(() => {
            capaError.style.opacity = 0;
        }, 5000);
        return;
    }    
    const tweetObj = {
        id: Date.now(),
        texto: mensaje
    };

    tweets.push(tweetObj);
    localStorage.setItem('tweets', JSON.stringify(tweets));

    mostrarMensajes();
    mensajeInput.value = '';
}

function mostrarMensajes() {
    const listaMensajes = document.getElementById('listaMensajes');
    listaMensajes.innerHTML = '';

    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    // Verificamos duplicados antes del ciclo
    const mensajeInput = document.getElementById('mensajeInput');
    const nuevoMensaje = mensajeInput.value.trim(); // Obtenemos el nuevo mensaje// Obtenemos el nuevo mensaje

    tweets.forEach(mensaje => {
        const liMensaje = document.createElement('li');
        liMensaje.textContent = mensaje.texto;

        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'x';
        botonBorrar.classList.add('delete-button'); // Agregar una clase CSS para estilos
        botonBorrar.dataset.id = mensaje.id;
        botonBorrar.addEventListener('click', borrarMensaje);

        liMensaje.appendChild(botonBorrar); // Agregar el botón al elemento li
        listaMensajes.appendChild(liMensaje);
    });
}

function borrarMensaje(event) {
    // Obtenemos el id del mensaje a eliminar
    const idMensaje = event.target.dataset.id;

    // Mostrar un mensaje de confirmación
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
        // Filtramos los tweets para eliminar el que coincide con el id
        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        const nuevosTweets = tweets.filter(tweet => tweet.id !== idMensaje);

        localStorage.setItem('tweets', JSON.stringify(nuevosTweets));

        // Encontrar el elemento li a eliminar en el DOM (opcional, para mayor eficiencia)
        const liEliminar = document.querySelector(`li button[data-id="${idMensaje}"]`).parentNode;
        console.log(liEliminar);
        liEliminar.remove();
    }
   // mostrarMensajes();
}