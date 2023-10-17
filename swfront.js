if (1 == 1) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                    document.querySelector('#message').innerHTML = 'Service Worker registered with scope:'
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                    document.querySelector('#message').innerHTML = 'Service Worker registration failed:' + error;
                });
        });
    }
}