document.addEventListener('DOMContentLoaded', () => {
    // Define los datos de las opciones y sus ventanas asociadas.
    // Esto centraliza la configuración y facilita la gestión.
    const opcionesData = [
        { id: 'opcion1', ventanaId: 'ventana-opcion1' },
        { id: 'opcion2', ventanaId: 'ventana-opcion2' },
        { id: 'opcion3', ventanaId: 'ventana-opcion3' },
        { id: 'opcion4', ventanaId: 'ventana-opcion4' }
    ];

    // Obtiene todas las opciones de navegación y las ventanas de contenido.
    // Se utilizan querySelector y getElementById para mayor claridad y especificidad.
    const allOptions = opcionesData.map(data => document.querySelector(`.nav-item-custom.${data.id}`));
    const allVentanas = opcionesData.map(data => document.getElementById(data.ventanaId));

    /**
     * Cierra todas las ventanas de contenido y desactiva las opciones de navegación fijas.
     * Esto asegura que solo una ventana esté abierta a la vez.
     */
    function closeAll() {
        allVentanas.forEach(ventana => {
            if (ventana) { // Verifica que el elemento exista antes de manipularlo.
                ventana.classList.remove('ventana-fija');
                ventana.setAttribute('aria-hidden', 'true'); // Oculta la ventana para lectores de pantalla
            }
        });
        allOptions.forEach(opcion => {
            if (opcion) { // Verifica que el elemento exista.
                opcion.classList.remove('fixed-active');
                opcion.setAttribute('aria-expanded', 'false'); // Actualiza el estado de accesibilidad
            }
        });
    }

    // Itera sobre los datos de las opciones para añadir los event listeners.
    opcionesData.forEach(data => {
        const opcion = document.querySelector(`.nav-item-custom.${data.id}`);
        const ventana = document.getElementById(data.ventanaId);

        // Asegura que tanto la opción como la ventana existan antes de añadir listeners.
        if (opcion && ventana) {
            // Manejador de clic para las opciones de navegación.
            opcion.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que el clic se propague al documento.

                // Si la ventana ya está abierta, la cierra. De lo contrario, cierra todas y abre la seleccionada.
                if (ventana.classList.contains('ventana-fija')) {
                    closeAll();
                } else {
                    closeAll(); // Cierra todas las demás ventanas.
                    ventana.classList.add('ventana-fija'); // Abre la ventana seleccionada.
                    opcion.classList.add('fixed-active'); // Activa el estilo de la opción.
                    ventana.focus(); // Enfoca la ventana para mejorar la accesibilidad.
                    ventana.setAttribute('aria-hidden', 'false'); // Muestra la ventana para lectores de pantalla
                    opcion.setAttribute('aria-expanded', 'true'); // Actualiza el estado de accesibilidad
                }
            });

            // Evita que los clics dentro de la ventana la cierren.
            ventana.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    });

    // Cierra las ventanas al hacer clic fuera de ellas o de las opciones de navegación.
    document.addEventListener('click', (event) => {
        const activeVentana = document.querySelector('.ventana-opcion1.ventana-fija, .ventana-opcion2.ventana-fija, .ventana-opcion3.ventana-fija, .ventana-opcion4.ventana-fija');

        if (activeVentana) {
            let clickedInsideOption = false;
            // Comprueba si el clic fue dentro de alguna de las opciones de navegación.
            for (const opcion of allOptions) {
                if (opcion && opcion.contains(event.target)) {
                    clickedInsideOption = true;
                    break;
                }
            }

            // Si el clic no fue dentro de la ventana activa ni dentro de una opción, cierra todas las ventanas.
            if (!activeVentana.contains(event.target) && !clickedInsideOption) {
                closeAll();
            }
        }
    });

    // Cierra las ventanas al presionar la tecla 'Escape'.
    document.addEventListener('keydown', (event) => {
        const activeVentana = document.querySelector('.ventana-opcion1.ventana-fija, .ventana-opcion2.ventana-fija, .ventana-opcion3.ventana-fija, .ventana-opcion4.ventana-fija');
        if (event.key === 'Escape' && activeVentana) {
            closeAll();
        }
    });

    // Lógica para el mensaje de descarga del CV.
    const downloadButton = document.querySelector('.download-cv-button');
    const messageBox = document.getElementById('downloadMessageBox');

    if (downloadButton && messageBox) {
        downloadButton.addEventListener('click', (event) => {
            event.preventDefault(); // Previene la acción por defecto del enlace.

            messageBox.classList.add('show'); // Muestra el mensaje de descarga.
            messageBox.setAttribute('aria-hidden', 'false'); // Hace el mensaje visible para lectores de pantalla.

            // Inicia la descarga y oculta el mensaje después de un breve retraso.
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = downloadButton.href;
                link.download = downloadButton.download;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                messageBox.classList.remove('show'); // Oculta el mensaje.
                messageBox.setAttribute('aria-hidden', 'true'); // Oculta el mensaje para lectores de pantalla.
            }, 500); // Retraso de 500ms para que el usuario vea el mensaje.
        });
    }
});
