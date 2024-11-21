class EMA { // Exponential moving average
    #currentEMA
    #alpha

    constructor(windowSize) {
        this.#alpha = 2 / (windowSize + 1); // Smoothing factor
        this.#currentEMA = null; // Start with no EMA
    }

    setWindowSize(windowSize) {
        this.#alpha = 2 / (windowSize + 1); // Smoothing factor
    }

    current() {
        return this.#currentEMA;
    }

    update(newValue) {
        if (this.#currentEMA === null) {
            this.#currentEMA = newValue; // Initialize with the first value
        } else {
            this.#currentEMA = this.#alpha * newValue + (1 - this.#alpha) * this.#currentEMA;
        }
        return this.#currentEMA;
    }
}

module.exports = EMA;