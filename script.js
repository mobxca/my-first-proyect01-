// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MANEJO DEL FORMULARIO DE CONTACTO
    const form = document.getElementById('formContacto');
    const notificacion = document.getElementById('notificacion');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validar que los campos no estén vacíos
            if (nombre === '' || email === '' || mensaje === '') {
                alert('⚠️ Por favor, completa todos los campos');
                return;
            }
            
            // Mostrar notificación de éxito
            mostrarNotificacion('✅ ¡Mensaje enviado con éxito!');
            
            // Limpiar el formulario
            form.reset();
            
            // Mostrar en consola (para desarrollo)
            console.log('Mensaje enviado:', { 
                nombre: nombre, 
                email: email, 
                mensaje: mensaje,
                fecha: new Date().toLocaleString()
            });
        });
    }
    
    // 2. FUNCIÓN PARA MOSTRAR NOTIFICACIONES
    function mostrarNotificacion(mensaje) {
        if (!notificacion) return;
        
        // Cambiar el texto de la notificación
        notificacion.textContent = mensaje;
        
        // Mostrar la notificación
        notificacion.style.display = 'block';
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notificacion.style.display = 'none';
            // Restaurar el texto original
            notificacion.textContent = '✅ ¡Mensaje enviado con éxito!';
        }, 3000);
    }
    
    // 3. INTERACCIÓN CON LOS PROYECTOS
    const proyectos = document.querySelectorAll('.proyectos-lista li');
    
    proyectos.forEach(proyecto => {
        // Efecto al hacer clic en un proyecto
        proyecto.addEventListener('click', function() {
            const nombreProyecto = this.querySelector('strong').textContent;
            const estado = this.querySelector('small').textContent;
            
            // Mostrar información del proyecto
            alert(`🔍 Proyecto: ${nombreProyecto}\n📌 Estado: ${estado}\n\n✨ Más información próximamente.`);
        });
        
        // Efecto adicional: cambiar color al pasar el mouse (opcional)
        proyecto.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        
        proyecto.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
    });
    
    // 4. EFECTO DE SCROLL SUAVE PARA ENLACES (opcional)
    const enlaces = document.querySelectorAll('nav a, footer a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            // Solo aplicar si el enlace apunta a una sección dentro de la página
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                // Scroll suave hacia arriba
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 5. SALUDO EN CONSOLA (solo para desarrollo)
    console.log('🎉 ¡Página cargada exitosamente!');
    console.log('💡 Tip: Los proyectos son interactivos, ¡haz clic en ellos!');
    
    // 6. FUNCIÓN EXTRA: Mostrar mensaje de bienvenida (solo una vez)
    const yaVisito = localStorage.getItem('yaVisito');
    
    if (!yaVisito) {
        setTimeout(() => {
            mostrarNotificacion('👋 ¡Bienvenido a mi sitio web!');
        }, 1000);
        localStorage.setItem('yaVisito', 'true');
    }
});