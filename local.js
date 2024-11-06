document.addEventListener('DOMContentLoaded', mostrarMensajes);

function guardarMensaje() {
    const mensajeInput = document.getElementById('mensajeInput');
    const mensaje = mensajeInput.value;

    if (mensaje.trim() === '') {
        alert('Por favor, introduce un mensaje.');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        texto: mensaje
    };
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    tweets.push(tweetObj);
    localStorage.setItem('tweets', JSON.stringify(tweets));

    mostrarMensajes();
    mensajeInput.value = '';
}

function mostrarMensajes() {
    const listaMensajes = document.getElementById('listaMensajes');
    listaMensajes.innerHTML = '';

    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    tweets.forEach(mensaje => {
        const li = document.createElement('li');
        li.textContent = mensaje.texto;
        listaMensajes.appendChild(li);
    });
}

function borrarMensaje() {


    
}