// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos del DOM
    const tareaInput = document.getElementById('tareaInput');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaTareas = document.getElementById('listaTareas');
    const totalTareasSpan = document.getElementById('totalTareas');
    const completadasSpan = document.getElementById('completadas');
    const limpiarBtn = document.getElementById('limpiarBtn');
    
    // Cargar tareas guardadas (si las hay)
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    
    // Función para guardar tareas en localStorage
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
    
    // Función para actualizar estadísticas
    function actualizarEstadisticas() {
        const total = tareas.length;
        const completadas = tareas.filter(t => t.completada).length;
        totalTareasSpan.textContent = total;
        completadasSpan.textContent = completadas;
    }
    
    // Función para renderizar la lista de tareas
    function renderizarTareas() {
        if (tareas.length === 0) {
            listaTareas.innerHTML = '<li style="text-align: center; color: #999;">✨ ¡No hay tareas! Agrega una nueva ✨</li>';
            actualizarEstadisticas();
            return;
        }
        
        listaTareas.innerHTML = '';
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.textContent = tarea.texto;
            li.className = tarea.completada ? 'completada' : '';
            
            // Botón para eliminar tarea individual
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = '❌';
            eliminarBtn.style.background = 'none';
            eliminarBtn.style.border = 'none';
            eliminarBtn.style.cursor = 'pointer';
            eliminarBtn.style.fontSize = '16px';
            eliminarBtn.style.marginLeft = '10px';
            
            eliminarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                tareas.splice(index, 1);
                guardarTareas();
                renderizarTareas();
            });
            
            li.addEventListener('click', () => {
                tarea.completada = !tarea.completada;
                guardarTareas();
                renderizarTareas();
            });
            
            li.appendChild(eliminarBtn);
            listaTareas.appendChild(li);
        });
        
        actualizarEstadisticas();
    }
    
    // Función para agregar nueva tarea
    function agregarTarea() {
        const texto = tareaInput.value.trim();
        
        if (texto === '') {
            alert('Por favor, escribe una tarea');
            return;
        }
        
        if (texto.length > 100) {
            alert('La tarea es demasiado larga (máximo 100 caracteres)');
            return;
        }
        
        tareas.push({
            texto: texto,
            completada: false,
            fecha: new Date().toISOString()
        });
        
        tareaInput.value = '';
        guardarTareas();
        renderizarTareas();
        
        // Efecto visual
        agregarBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            agregarBtn.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Función para limpiar todas las tareas
    function limpiarTodas() {
        if (tareas.length > 0 && confirm('¿Estás seguro de eliminar todas las tareas?')) {
            tareas = [];
            guardarTareas();
            renderizarTareas();
        }
    }
    
    // Event Listeners
    agregarBtn.addEventListener('click', agregarTarea);
    limpiarBtn.addEventListener('click', limpiarTodas);
    
    tareaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });
    
    // Renderizar tareas al cargar la página
    renderizarTareas();
    
    // Mensaje en consola
    console.log('✅ Aplicación cargada correctamente');
    console.log('📝 Tareas guardadas:', tareas.length);
});