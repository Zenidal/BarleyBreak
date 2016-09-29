export default class Statistics {
    constructor() {
        this.totalWins = 0;
        this.totalStarted = 0;
        this.totalLosed = 0;
    }

    winGame() {
        this.totalWins++;
    }

    loseGame() {
        this.totalLosed++;
    }

    startGame() {
        this.totalStarted++;
    }
}