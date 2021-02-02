function simulateKeypress(key) {
    const event = new KeyboardEvent('keydown', {key: key});
    document.dispatchEvent(event);
}

export function simulateKeypressInOrder(inputs) {
    inputs.forEach(input => simulateKeypress(input));
}

