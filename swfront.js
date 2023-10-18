if (1 == 1) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
               
                    document.querySelector('#message').innerHTML = 'Service Worker registered with scope:'
                })
                .catch(error => {
                
                    document.querySelector('#message').innerHTML = 'Service Worker registration failed:' + error;
                });
        });
    }
}