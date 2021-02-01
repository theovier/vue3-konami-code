export default {
    install: (app, options) => {
        if (options === undefined || typeof options.onKonamiCodeEntered !== "function") {
            console.warn("Konami-Code Plugin installed but no method 'onKonamiCodeEntered' in options parameter detected.");
            return;
        }

        const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let currentPosition = 0

        function reset() {
            currentPosition = 0;
        }

        function konamiCodeListener(event) {
            console.log(event.key);
            if (event.key === KONAMI_CODE[currentPosition++]) {
                if (currentPosition === KONAMI_CODE.length) {
                    options.onKonamiCodeEntered()
                    reset();
                }
            } else {
                reset();
            }
        }

        document.addEventListener('keydown', konamiCodeListener);
    }
}