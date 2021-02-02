# Vue.js 3 Konami Code Plugin

Add the [Konami Code](https://en.wikipedia.org/wiki/Konami_Code) to your Vue 3 application.
Credits are due to the original [Vue 2 Konami Code Plugin](https://github.com/azzra/vue-konami-code).

## Installation

```sh
npm install --save vue3-konami-code
```

## Usage

```js
import KonamiCode from "vue3-konami-code"

Vue.use(KonamiCode, {
    onKonamiCodeEntered: function() {
        alert("Konami Code successfully entered!");
    }
});
```