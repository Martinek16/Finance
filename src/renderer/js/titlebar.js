// src/renderer/js/titlebar.js
const { remote } = require('electron');
const { BrowserWindow } = remote;

document.addEventListener('DOMContentLoaded', () => {
    const currentWindow = remote.getCurrentWindow();
    const titlebar = document.getElementById('titlebar');
    
    // Spremenljivke za shranjevanje stanja okna
    let isMaximized = false;
    let originalBounds = null;

    document.getElementById('close-button').addEventListener('click', () => {
        currentWindow.close();
    });

    document.getElementById('min-button').addEventListener('click', () => {
        currentWindow.minimize();
    });

    const maxButton = document.getElementById('max-button');
    maxButton.addEventListener('click', () => {
        if (isMaximized) {
            // Vrnitev okna v prvotno velikost
            currentWindow.unmaximize();
            isMaximized = false;

            // Ponovna nastavitev originalnih dimenzij okna
            if (originalBounds) {
                currentWindow.setBounds(originalBounds);
            }

            maxButton.innerHTML = '<i class="far fa-window-maximize"></i>';
        } else {
            // Shranitev originalnih dimenzij okna
            originalBounds = currentWindow.getBounds();

            // Povečanje okna na celozaslonski način
            currentWindow.maximize();
            isMaximized = true;

            maxButton.innerHTML = '<i class="far fa-window-restore"></i>'; // Spremeni ikono v obnovi
        }
    });

    // Spremeni ikono glede na stanje okna ob zagonu
    if (currentWindow.isMaximized()) {
        isMaximized = true;
        maxButton.innerHTML = '<i class="far fa-window-restore"></i>';
    } else {
        maxButton.innerHTML = '<i class="far fa-window-maximize"></i>';
    }
});
