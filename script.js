import { obtenerTareas } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const tareas = await obtenerTareas();
        const listaTareas = document.querySelector("#lista");

        const crearTarea = (nombreTarea, estadoTarea) => {
            const tarea = document.createElement("div");
            tarea.textContent = nombreTarea;
            tarea.classList.add("lista__tarea");
            estadoTarea ? tarea.classList.add("lista__tarea--terminada") : tarea.classList.add("lista__tarea--pendiente");

            tarea.addEventListener("click", () => {
                tarea.classList.toggle("lista__tarea--terminada");
                tarea.classList.toggle("lista__tarea--pendiente");
                const tareaIndex = tareas.findIndex(t => t.nombre === nombreTarea);
                tareas[tareaIndex].terminada = !tareas[tareaIndex].terminada;
            });

            return tarea;
        };

        const agregarTarea = (nombreTarea, estadoTarea) => {
            const nuevaTarea = crearTarea(nombreTarea, estadoTarea);
            listaTareas.appendChild(nuevaTarea);
            tareas.push({ nombre: nombreTarea, terminada: estadoTarea });
        };

        tareas.forEach((tarea) => {
            agregarTarea(tarea.nombre, tarea.terminada);
        });

        const formTareas = document.querySelector("#formulario");
        formTareas.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombreTarea = e.target.nombreTarea.value;
            const estadoTarea = e.target.estadoTarea.checked;
            agregarTarea(nombreTarea, estadoTarea);
            e.target.reset();
        });
    } catch (error) {
        console.error('Error al renderizar las tareas:', error);
    }
});
