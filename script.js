document.addEventListener('DOMContentLoaded', () => {
    // Código existente para las ventanas laterales en escritorio
    const opcionesData = [
        { id: 'opcion1', ventanaId: 'ventana-opcion1' },
        { id: 'opcion2', ventanaId: 'ventana-opcion2' },
        { id: 'opcion3', ventanaId: 'ventana-opcion3' },
        { id: 'opcion4', ventanaId: 'ventana-opcion4' }
    ];
    const allOptions = opcionesData.map(data => document.querySelector(`.${data.id}`));
    const allVentanas = opcionesData.map(data => document.getElementById(data.ventanaId));

    function closeAll() {
        allVentanas.forEach(ventana => {
            if (ventana) ventana.classList.remove('ventana-fija');
        });
        allOptions.forEach(opcion => {
            if (opcion) opcion.classList.remove('fixed-active');
        });
    }

    // La lógica de las ventanas laterales de escritorio ya no está condicionada por el tamaño de la pantalla.
    // Bootstrap se encargará de ocultar/mostrar los elementos con d-none y d-md-block.
    opcionesData.forEach(data => {
        const opcion = document.querySelector(`.${data.id}`);
        const ventana = document.getElementById(data.ventanaId);
        if (opcion && ventana) {
            opcion.addEventListener('click', (event) => {
                event.stopPropagation();
                if (ventana.classList.contains('ventana-fija')) {
                    closeAll();
                } else {
                    closeAll();
                    ventana.classList.add('ventana-fija');
                    opcion.classList.add('fixed-active');
                    ventana.focus();
                }
            });
            ventana.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    });

    document.addEventListener('click', (event) => {
        const activeVentana = document.querySelector('.ventana-opcion1.ventana-fija, .ventana-opcion2.ventana-fija, .ventana-opcion3.ventana-fija, .ventana-opcion4.ventana-fija');
        if (activeVentana) {
            let clickedInsideOption = false;
            allOptions.forEach(opcion => {
                if (opcion && opcion.contains(event.target)) {
                    clickedInsideOption = true;
                }
            });
            if (!activeVentana.contains(event.target) && !clickedInsideOption) {
                closeAll();
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        const activeVentana = document.querySelector('.ventana-opcion1.ventana-fija, .ventana-opcion2.ventana-fija, .ventana-opcion3.ventana-fija, .ventana-opcion4.ventana-fija');
        if (event.key === 'Escape' && activeVentana) {
            closeAll();
        }
    });

    // Lógica para el mensaje de descarga del CV
    const downloadButton = document.querySelector('.download-cv-button');
    const messageBox = document.getElementById('downloadMessageBox');

    if (downloadButton && messageBox) {
        downloadButton.addEventListener('click', (event) => {
            // Prevenir la acción por defecto del enlace para mostrar el mensaje primero
            event.preventDefault();

            // Mostrar el mensaje
            messageBox.classList.add('show');

            // Después de un breve retraso, iniciar la descarga y ocultar el mensaje
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = downloadButton.href;
                link.download = downloadButton.download;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Ocultar el mensaje después de la descarga
                messageBox.classList.remove('show');
            }, 500); // Pequeño retraso para que el usuario vea el mensaje
        });
    }
});
