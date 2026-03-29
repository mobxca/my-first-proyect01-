// Buscar el botón por su ID
const boton = document.getElementById('miBoton');
const mensaje = document.getElementById('mensaje');

// Cuando hagan clic en el botón
boton.addEventListener('click', function() {
    mensaje.textContent = '¡Gracias por hacer clic! 🎉';
    mensaje.style.color = 'green';
    mensaje.style.fontWeight = 'bold';
});