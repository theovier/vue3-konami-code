import KonamiCode from '../src/konami-code.js';
import { createApp } from 'vue';
import { simulateKeypressInOrder } from "./test-utils";

test('displaying warning when no options are provided ', () => {
    console.warn = jest.fn()
    createApp(null)
        .use(KonamiCode)
    expect(console.warn).toHaveBeenCalled();
});

test('displaying warning when no callback function in the options is provided ', () => {
    console.warn = jest.fn()
    createApp(null)
        .use(KonamiCode, {})
    expect(console.warn).toHaveBeenCalled();
});

test('display no warning when callback function is provided', () => {
    console.warn = jest.fn()
    createApp(null)
        .use(KonamiCode, {
            onKonamiCodeEntered: function() {}
        })
    expect(console.warn).not.toHaveBeenCalled();
});

test('konami called triggers callback', () => {
    let hasBeenCalled = false;
    createApp(null)
        .use(KonamiCode, {
            onKonamiCodeEntered: function() {
                hasBeenCalled = true;
            }
        });

    const correctInput = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    simulateKeypressInOrder(correctInput);
    expect(hasBeenCalled).toBe(true);
});

test('wrong code does not trigger callback', () => {
    let hasBeenCalled = false;
    createApp(null)
        .use(KonamiCode, {
            onKonamiCodeEntered: function() {
                hasBeenCalled = true;
            }
        });

    const incorrectInput = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "x", "a"];
    simulateKeypressInOrder(incorrectInput);
    expect(hasBeenCalled).toBe(false);
});

test('correct code can be entered even after wrong input', () => {
    let hasBeenCalled = false;
    createApp(null)
        .use(KonamiCode, {
            onKonamiCodeEntered: function() {
                hasBeenCalled = true;
            }
        });

    const incorrectInput = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "x", "a"];
    simulateKeypressInOrder(incorrectInput);

    const correctInput = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    simulateKeypressInOrder(correctInput);

    expect(hasBeenCalled).toBe(true);
});

test('incorrect code still fails after failed attempt', () => {
    let hasBeenCalled = false;
    createApp(null)
        .use(KonamiCode, {
            onKonamiCodeEntered: function() {
                hasBeenCalled = true;
            }
        });

    const incorrectInput = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "x", "a"];
    simulateKeypressInOrder(incorrectInput);

    const anotherIncorrectInput = ["ArrowUp", "b", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    simulateKeypressInOrder(anotherIncorrectInput);

    expect(hasBeenCalled).toBe(false);
});
