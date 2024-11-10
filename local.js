document.addEventListener('DOMContentLoaded', mostrarMensajes);

let capaError = document.getElementById("capaError");
// const DOMmensaje = document.querySelector('#mensajes');

function guardarMensaje() {
    const mensajeInput = document.getElementById('mensajeInput');
    const mensaje = mensajeInput.value;

    if (mensaje.trim() === '') {

        capaError.textContent = "Por favor, introduce un mensaje.";
        capaError.style.opacity = 1; // Mostrar el mensaje inmediatamente

        setTimeout(() => {
            capaError.style.opacity = 0; // Ocultar el mensaje después de 10 segundos
        }, 10000);
        return;
        /*alert('Por favor, introduce un mensaje.');
        return;*/
    }

    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    const textos = new Set(tweets.map(tweet => tweet.texto));
    // Verificar duplicados ANTES de agregar
    if (textos.has(mensaje)) {
        // El mensaje ya existe
        capaError.textContent = "Este mensaje ya existe.";
        capaError.style.opacity = 1; // Mostrar el mensaje
        capaError.style.backgroundColor = "yellow";

        // Ocultar el mensaje después de 3 segundos (ajusta el tiempo según sea necesario)
        setTimeout(() => {
            capaError.style.opacity = 0;
        }, 3000);
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
    const nuevoMensaje = mensajeInput.value.trim(); // Obtenemos el nuevo mensaje

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



    // listaMensajes.appendChild(liMensaje);
}


function borrarMensaje(event) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const idMensaje = event.target.dataset.id;
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    // Filtramos los mensajes para eliminar el que coincida con el id
    const nuevosTweets = tweets.filter(tweet => tweet.id !== idMensaje);
    localStorage.setItem('tweets', JSON.stringify(nuevosTweets));
    mostrarMensajes(); // Actualizamos la lista


}